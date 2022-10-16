import { JwtResponse, User, UserActivate } from "../../types/userTypes";
import { ACTIVATION, GET_USER, SIGN_IN, SIGN_UP, USER_AUTHORIZE } from "../action_types";
import { put, takeEvery } from "redux-saga/effects";
import { createTokenUserError, signUpError } from "./user_error_creators";

// вызывается по кнопке signup - прилетает username, почта и пароль для регистрации нового пользователя
const signup = (userInfo: User) => ({
    type: SIGN_UP,
    userInfo
});

// вызывается по кнопке signin - прилетает мыло и пароль для авторизации пользователя
const signin = (userInfo: User) => ({
    type: SIGN_IN,
    userInfo,
});

// передаем авторизованного пользователя для сохранения в стор
const userAuthorize = (user: User | null) => ({
    type: USER_AUTHORIZE,
    user
});

// вызывается при активации нового пользователя
const activation = (activationInfo: UserActivate) => ({
    type: ACTIVATION,
    activationInfo,
});

// вызывается при получении данных о пользователе
const getUser = () => ({
    type: GET_USER,
});

// проверка актуальности токена access
function* verifyTokenUser() {
    const token = localStorage.getItem('jwtAccess');
    const data: Response = yield fetch('https://studapi.teachmeskills.by/auth/jwt/verify/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({token})   
    });

    return data.status === 200;
};

// обновление токена access
function* refreshTokenUser() {
    const refresh = localStorage.getItem('jwtRefresh');
    const data: Response = yield fetch('https://studapi.teachmeskills.by/auth/jwt/refresh/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({refresh})    
    });
    const { access } = yield data.json();
    localStorage.setItem('jwtAccess', access);
    return access;
}

// получение действующего токена access
function* getToken() {
    const isAccess: boolean = yield verifyTokenUser();
    if (isAccess) {
        return localStorage.getItem('jwtAccess');
    } else {
        const token: string = yield refreshTokenUser()
        return token;
    }
}

// вызывается при эммулировании action_type = GET_USER
function* getUserInfo() {
    const token: string = yield getToken();
    const data: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/me/', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },     
    });
    const user: User = yield data.json();
    yield put(userAuthorize(user));
}

// при вызвове signin - отправка запроса на авторизацию пользователя
function* fetchSignIn(action: any) {
    const { userInfo } = action; 
    yield createUserTokens(userInfo);
}

// при вызове крейтера signup делается запрос на получение ссылки для активации нового пользователя
function* fetchSignUp(action: any): any {
    try {
        const { userInfo } = action;
        const data: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userInfo)
        });
 
        if (data.status < 200 || data.status >= 300) {
            throw data;
        } else {
            const userNew = yield data.json();
            userNew.password = userInfo.password;
            yield localStorage.setItem('userNew', JSON.stringify(userNew));
            yield put(signUpError([]));
        }
        
    } catch(error: any) {
        if (error.status === 400) {
            const errResponse = yield error.json();
            const errors: string[] = [];
            for (const key in errResponse) {
                yield errResponse[key].map((err: any) => errors.push(err))
            }
            yield put(signUpError(errors));
       } else {
            yield put(signUpError(['Error']));
       }
    }
};

// при переходе по ссылке на (uid и token) для активации, полученной после отправки запроса на регистрацию нового пользователя
function* activateUser(action: any) {
    try {
        const { activationInfo } = action;
        console.log('пришло на активацию:', JSON.stringify(activationInfo));
        const data: Response = yield fetch('https://studapi.teachmeskills.by/auth/users/activation/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(activationInfo)
        });
        console.log('ответ после запроса на активацию =', data);
        if (data.status < 300) {  // если все хорошо, пользователь активирован, получаем для него токены и кидаем на home
            const userInfo: User = yield JSON.parse(localStorage.getItem('userNew') + '');
            console.log('для запроса токенов после активации:', userInfo);
            yield createUserTokens({email: userInfo.email, password: userInfo.password});
            yield window.location.href = '/';
            localStorage.removeItem('userNew');
            yield put(userAuthorize(userInfo));
        } else { //если ошибка в активации, то ошибку в стор, пользователя чистим и перекидываем на sign up
            throw data;
        }        
    } catch(error: any) {
        console.log('ошибка активации =', error);
        localStorage.removeItem('userNew');        
        yield window.location.href = '/signup';
        yield put(signUpError(['No authorized']));
    }
};

// получение access и refresh токенов для созданного пользователя(sign up) или залогинившегося(sign in)
function* createUserTokens(userInfo: User) {
    try {
        console.log('token for user:', userInfo);
        const data: Response = yield fetch('https://studapi.teachmeskills.by/auth/jwt/create/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userInfo)
        });
        console.log('created token:', data)
        if (data.status === 200) {
            const jwt: JwtResponse = yield data.json();
            const { access, refresh } = jwt;
            localStorage.setItem('jwtAccess', access);
            localStorage.setItem('jwtRefresh', refresh);
            yield window.location.href = '/';
        }
        else {
            throw data;
        } 
    } catch(error: any) {
        console.log('ошибка поллучения токенов:', error);
        yield put(createTokenUserError(['No authorized']));
        const { pathname } = yield window.location;
        if (pathname !== '/signin') {
            window.location.href = '/signin';
        }    
    }
}

function* watcherUser() {
    yield takeEvery(SIGN_UP, fetchSignUp);
    yield takeEvery(ACTIVATION, activateUser);
    yield takeEvery(SIGN_IN, fetchSignIn);
    yield takeEvery(GET_USER, getUserInfo);
};

export { signup, signin, getUser, userAuthorize, activation, watcherUser };