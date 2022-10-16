import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MIN_PWD_LENGTH } from "../../constants";
import { useInput } from "../../hooks";
import { signin, userAuthorize } from "../../redux/action_creators";
import { StoreState } from "../../redux/storeTypes";
import './SignIn.css';

const SignIn = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(userAuthorize(null));
    }, []);
    
    const email = useInput('email', '', {'isEmpty': true, 'isEmail': true});
    const password = useInput('password', '', {'isEmpty': true, 'minLengthErr': MIN_PWD_LENGTH});
     
    const onSignClick = () => {
        dispatch(signin({email: email.value, password: password.value}));
    }    

    const signUpErrors = useSelector((state: StoreState) => state.errors.signUpErrors);
    const createTokenUserErrors = useSelector((state: StoreState) => state.errors.createTokenUserErrors)
    const userErrors: string[] = [];

    if (signUpErrors !== undefined && createTokenUserErrors !== undefined) {
        signUpErrors.concat(createTokenUserErrors).map(err => userErrors.push(err));
    }

    return (
        <div className="sign-in-container">
            <h2 className="sign-in-container-title">Sign In</h2>
            <div>
                { 
                    userErrors.length > 0 && 
                    userErrors.map((err, index) => <div key={index} style={{color: 'red'}}>{err}</div>)
                }            
            </div>
            <div className="sign-in-block">
                <div className="sign-in-block-content">
                    <label>
                        Email
                        <input onChange={(e) => email.onChange(e)} name="email" className="sign-in-block-el" type="email" placeholder="Email" value={email.value}></input>
                        {email.valid && <div style={{color: 'red'}}>{email.valid}</div>}
                    </label>
                </div>
                <div className="sign-in-block-content">
                    <label>
                        Password
                        <input onChange={(e) => password.onChange(e)} name="password" className="sign-in-block-el" type="password" placeholder="Password" value={password.value}></input>
                        {password.valid && <div style={{color: 'red'}}>{password.valid}</div>}
                    </label>
                </div>  
                <button className="sign-in-block-btn-sign-in" 
                        disabled={!!email.valid || !!password.valid}
                        onClick={onSignClick}>
                    Sign In
                </button>
                <div>
                    <span>Don't have an account?<Link to="/signup">Sing Up</Link></span>
                </div> 
            </div>
        </div>
    )
};

export { SignIn };