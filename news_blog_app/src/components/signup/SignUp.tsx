import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MIN_PWD_LENGTH } from "../../constants";
import { useInput } from "../../hooks";
import { signup, userAuthorize } from "../../redux/action_creators";
import { StoreState } from "../../redux/storeTypes";
import './SignUp.css';

const SignUp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.clear();
        dispatch(userAuthorize(null));
    }, []);

    const username = useInput('username', '', {'isEmpty': true});
    const email = useInput('email', '', {'isEmpty': true, 'isEmail': true});
    const password = useInput('password', '', {'isEmpty': true, 'minLengthErr': MIN_PWD_LENGTH});
    const confirmPassword = useInput('confirmPassword', '', {'isEmpty': true, 'confirmPwd': password.value});

    const onSignUp = () => {
        if (confirmPassword.value === password.value) {
            dispatch(signup({
                username: username.value,
                email: email.value,
                password: password.value,
            }));
        }
    };

    const signUpErrors = useSelector((state: StoreState) => state.errors.signUpErrors);
    const createTokenUserErrors = useSelector((state: StoreState) => state.errors.createTokenUserErrors)
    const userErrors: string[] = [];

    if (signUpErrors !== undefined && createTokenUserErrors !== undefined) {
        signUpErrors.concat(createTokenUserErrors).map(err => userErrors.push(err));
    }

    return (
        <div className="sign-up-container">
            <h2 className="sign-up-container-title">Sign Up</h2>
            <div>
                { 
                    userErrors.length > 0 && 
                    userErrors.map((err, index) => <div key={index} style={{color: 'red'}}>{err}</div>)
                }            
            </div>
            <div className="sign-up-block">
                <div className="sign-up-block-content">
                    <label> 
                        Username
                        <input onChange={(e) => username.onChange(e)}  name="username" className="sign-up-block-el" type="text" placeholder="Username" value={username.value}></input>
                        {username.valid && <div style={{color: 'red'}}>{username.valid}</div>}
                    </label>
                </div>
                <div className="sign-up-block-content">
                    <label>
                        Email
                        <input onChange={(e) => email.onChange(e)} name="email" className="sign-up-block-el" type="email" placeholder="Email" value={email.value}></input>
                        {email.valid && <div style={{color: 'red'}}>{email.valid}</div>}
                    </label>
                </div>
                <div className="sign-up-block-content">
                    <label>
                        Password
                        <input onChange={(e) => password.onChange(e)} name="password" className="sign-up-block-el" type="password" placeholder="Password" value={password.value}></input>
                        {password.valid && <div style={{color: 'red'}}>{password.valid}</div>}
                    </label>
                </div>
                <div className="sign-up-block-content">
                    <label>
                        Confirm Password
                        <input onChange={(e) => confirmPassword.onChange(e)} name="confirm-password" className="sign-up-block-el" type="password" placeholder="Confirm password" value={confirmPassword.value}></input>
                        {confirmPassword.valid && <div style={{color: 'red'}}>{confirmPassword.valid}</div>}
                    </label>
                </div>   
                <button className="sign-up-block-btn-sign-up" 
                        disabled={
                            !!username.valid || !!email.valid || !!password.valid || !!confirmPassword.valid
                            || password.value === confirmPassword.value
                        }
                        onClick={onSignUp}>
                    Sign Up
                </button>
                <div>
                    <span>Already have an account?<Link to="/signin">Sing In</Link></span>
                </div>              
            </div>
        </div>
    );
};

export { SignUp };