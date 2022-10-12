import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SignIn.css';
import { StoreState } from '../../types';
import { authorize, signin } from '../../redux/action_creators';
import { useNavigate} from 'react-router-dom';

const SignIn = () => {
    const theme = useSelector((state: StoreState) => state.theme.theme)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }
    const onSignIn = (e: any) => {
        if (email === '') {
            emailRef.current.focus();
        } else if (password === '') {
            passRef.current.focus();
        }
        console.log(email, password)
        dispatch(signin({ email, password }, navigate))
        // dispatch(authorize());
        // window.history.back()
        //navigate('/posts/new')
    }
    return (
        <div>
            <h2 className={`${theme}-title`}>Sign In</h2>
            <div className={`sign-in-form ${theme}-sign-in-form`}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passRef} type="password" placeholder="Password" onChange={handlePasswordChange}/>
                    <Form.Text className="text-muted">
                        <Link to='/forgotpass'>Forgot password?</Link>
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" className="sign-in-button" onClick={onSignIn}>
                    Submit
                </Button>
                <Form.Text className="text-muted no-account-text">
                        <span>Don't have a account?<Link to='/signup'>Sign up</Link></span>
                </Form.Text>
            </div>
        </div>
    )
};

export { SignIn };