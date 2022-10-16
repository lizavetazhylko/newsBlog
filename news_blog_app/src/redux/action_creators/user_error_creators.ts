import { CREATE_USER_TOKEN_ERROR, SIGN_UP, SIGN_UP_ERROR } from "../action_types";

const signUpError = (errors: string[]) => ({
    type: SIGN_UP_ERROR,
    errors,
});

const createTokenUserError = (errors: string[]) => ({
    type: CREATE_USER_TOKEN_ERROR,
    errors,
});

export { signUpError, createTokenUserError };