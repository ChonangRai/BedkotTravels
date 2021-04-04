import React, { useState } from 'react';
import * as Icons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';


export const UserLogin = () => {

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
        axios.post('http://localhost:90/registration/login', user).then((response) => {
            localStorage.setItem('user-token', response.data.token);
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
        <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
            <Alert show={show} className="mt-3" variant={varient} onClose={() => setShow(false)} dismissible>{message}</Alert>
            <div className="card card0 border-0">
                <div className="row d-flex">
                    <div className="col-lg-6">
                        <div className="card1 pb-5">
                            <div className="row"> <div className="logo"></div> </div>
                            <div className="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="/visit_nepal.jpg" className="image" alt="Visit Nepal" /> </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card2 card border-0 px-4 py-5">
                            <div className="row mb-4 px-3">
                                <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                <div className="facebook text-center mr-3">
                                    <Icons.FaFacebook className="icon_signin" />
                                </div>
                                <div className="google text-center mr-3">
                                    <Icons.FaGoogle className="icon_signin" />
                                </div>
                                <div className="linkedin text-center mr-3">
                                    <Icons.FaLinkedinIn className="icon_signin" />
                                </div>
                            </div>
                            <div className="row px-3 mb-4">
                                <div className="line" /> <small className="or text-center">Or</small>
                                <div className="line" />
                            </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Email Address</h6>
                            </label> <input className="mb-4" type="text" name="email" placeholder="example@example.com" value={user.email} onChange={handleChange} /> </div>
                            <div className="row px-3"> <label className="mb-1">
                                <h6 className="mb-0 text-sm">Password</h6>
                            </label> <input type="password" name="password" placeholder="Enter password" value={user.password} onChange={handleChange} /> </div>
                            <div className="row px-3 mb-4">
                                <div className="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" className="custom-control-input" /> <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label> </div> <Link to="/password-reset" className="ml-auto mb-0 text-sm">Forgot Password?</Link>
                            </div>
                            <div className="row mb-3 px-3"> <button onClick={submitLogin} className="btn btn-primary px-5">Login</button> </div>
                            <div className="row mb-4 px-3"> <small className="font-weight-bold">Don't have an account? <Link to="/register" className="text-danger ">Register</Link></small> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserLogin;
