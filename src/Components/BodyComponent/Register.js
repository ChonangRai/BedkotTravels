import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import * as Icons from 'react-icons/fa';

const Register = () => {

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState();
    const [varient, setVarient] = useState('success');
    const [valid, setValid] = useState(true);

    const [user, setUser] = useState({
        fname: '',
        address: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(user.password===user.cpassword){
            setValid(true);
            axios.post('http://localhost:90/registration/insert', user).then((response) => {
                localStorage.setItem('user-token', user.token);
                setShow(true);
                setVarient('success');
                setMessage('Registration successful.');
                window.location.assign('/');
            }).catch((error) => {
                setShow(true);
                setVarient('danger');
                setMessage('Registration failed. Please contact admin.');
                console.log(error)
            });
        }else{
            setValid(false);
            setShow(true);
            setVarient('danger');
            setMessage('Passwords donot match. Please try again.');
        }
    }
    return (
        <div className="container">
            <Alert show={show} className="mt-3" variant={varient} onClose={() => setShow(false)} dismissible>{message}</Alert>
            <div className="card m-5">
                <div className="row p-5">
                    <div className="col-md-6">
                        <form className="form ml-4" onSubmit={handleRegister}>
                            <h3 className="mb-4 ml-4">Register an account</h3>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Icons.FaUser /></span>
                                </div>
                                <input name="fname" value={user.fname} onChange={handleChange} required type="text" className="form-control" placeholder="Full Name" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Icons.FaEnvelope /></span>
                                </div>
                                <input name="email" value={user.email} onChange={handleChange} type="email" required className="form-control" placeholder="Email address" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Icons.FaPhone /></span>
                                </div>
                                <input name="mobile" value={user.mobile} onChange={handleChange} type="phone" required className="form-control" placeholder="Contact number" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Icons.FaMapMarker /></span>
                                </div>
                                <input name="address" value={user.address} onChange={handleChange} type="text" required className="form-control" placeholder="Address" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Icons.FaUserSecret /></span>
                                </div>
                                <input name="password" value={user.password} onChange={handleChange} type="password" required className="form-control" placeholder="Password" />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><Icons.FaUserSecret /></span>
                                </div>
                                <input name="cpassword" value={user.cpassword} onChange={handleChange} type="password" required className={valid ? 'form-control' : 'form-control-danger'} placeholder="Confirm Password" />
                            </div>
                            <button onClick={handleRegister} className="btn btn-primary form-control mb-3">Register</button>
                        </form>
                    </div>
                    <div className="col-md-6 registerbg">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;