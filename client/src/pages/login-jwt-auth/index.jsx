import Axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { listUser, loginUser, readUser } from '../../api';
import { authenticate, getCookie, isAuth } from '../../helpers/auth';
import './style.scss';

function LoginJWT(props) {

    const history = useHistory();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });


    // const loadProfile = () => {
    //     const token = getCookie('token');
    //     if(isAuth() !== false)
    //     {
    //         readUser(isAuth()._id, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }).then(res => {
    //             setUserInfo(res.data);
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }
    //     listUser({},{
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     }).then(res => {
    //         console.log(res.data);
    //     }).catch(err => {
    //         console.log(err.response);
    //     });
    // }
    
    const handleLogin = e => {
        e.preventDefault();
        if(userData.email && userData.password) {
            loginUser(userData).then(res => {
                authenticate(res, () => {
                    setUserData({ email: '', password: '' })
                });
                isAuth() && isAuth().role === 'admin' ? console.log('admin role') : console.log('customer role');
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className="container-fluid full-screen d-flex align-items-center justify-content-center">
            <form onSubmit={handleLogin} className="form-login">
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
                <div className="d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-light mt-2" style={{width: '33%'}}>Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginJWT;