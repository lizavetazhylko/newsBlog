import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './SignUp.css'
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../types";
import { signup } from "../../redux/action_creators";
/*email: "cesigip615@vasqa.com"
id: 548
username: "DASDWDADDWAWDWAD"*/    

const SignUp = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: StoreState) => state.theme.theme)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('')
    const handleInputChange = (e: any, setter: Function) => {
        setter(e.target.value)
    }
    const onSignUp = () => {
        dispatch(signup({
            username: name,
            email,
            password
        }))
    }
    return (
        <div>
            <div className="sign-up-title">
                <Link to='/posts'>Back to home</Link >
                <h1>Sign In</h1>
            </div>
            <Form className="sign-up-form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Enter name" onChange={(e) => handleInputChange(e, setName)} value={name}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => handleInputChange(e, setEmail)} value={email}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => handleInputChange(e, setPassword)} value={password}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" onChange={(e) => handleInputChange(e, setConfirmPassword)} value={confirmpassword}/>
                </Form.Group>
                <Button variant="primary" className="sign-up-button" onClick={onSignUp}>
                    SignUP
                </Button>
                <Form.Text className="text-muted no-accaunt-text">
                    <span>Already have an account?<a href="#">Sing In</a></span>
                </Form.Text>
            </Form>
        </div>
    )
}

export default SignUp