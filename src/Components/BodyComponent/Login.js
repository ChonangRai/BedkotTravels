import React, { useState } from 'react';
import * as Icons from 'react-icons/fa';
import { Alert } from 'react-bootstrap';
import axios from 'axios';


export const Login = () => {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const [varient, setVarient] = useState();


    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const submitLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:90/admin/login', user).then((response) => {
            localStorage.setItem('admin-token', response.data.token);
            setShow(true);
            setVarient('success');
            setMessage('Logging in.');
            window.location.assign('/');
        }).catch((err) => {
            setShow(true);
            setVarient('danger');
            setMessage('Wrong login credentials. Please try again.');
            console.log(err);
        })
    }

    return (
        <div className="conteiner">
            <Alert show={show} className="mt-3" variant={varient} onClose={() => setShow(false)} dismissible>{message}</Alert>
            <div className="d-flex justify-content-center" style={{ marginTop: '75px' }}>
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img src="/login_logo.png" className="brand_logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center form_container">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <Icons.FaEnvelope />
                                    </span>
                                </div>
                                <input type="text" name="email" value={user.email} onChange={handleChange} className="form-control input_user" placeholder="example@example.com" />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <Icons.FaUserSecret />
                                    </span>
                                </div>
                                <input type="password" name="password" value={user.password} onChange={handleChange} className="form-control input_pass" defaultValue placeholder="password" />
                            </div>
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button type="button" onClick={submitLogin} name="button" className="btn login_btn">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;