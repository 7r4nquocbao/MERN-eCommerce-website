import Axios from 'axios';
import React, { useState } from 'react';
import {toast} from 'react-toastify';
import { registerUser } from '../../api';

function RegisterJWTAuth(props) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const { name, email, password, passwordConfirm } = userData;

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name && email && password) {
            if(password === passwordConfirm) {
                registerUser({
                    name: name, email: email, password: password
                }).then(res => {
                    setUserData({
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    })
                    toast.success('res.data.message');
                }).catch(err => {
                    setUserData({
                        name: '',
                        email: '',
                        password: '',
                        passwordConfirm: ''
                    });
                    console.log(err.response);
                })
            } else {
                toast.error('Password does not match')
            }
            
        } else {
            toast.error('Please fill out all fields')
        }
    }

    return (
        <div>
            {console.log(userData)}
            <form>
                <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name"
                            onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email"
                        onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password"
                        onChange={(e) => setUserData({...userData, password: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Password Confirm</label>
                    <input type="password" className="form-control" id="passwordConfirm"
                        onChange={(e) => setUserData({...userData, passwordConfirm: e.target.value})}/>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default RegisterJWTAuth;