import React from 'react';
import { useState } from 'react';
import { facebookToken, FACEBOOK_API, loginUser } from '../../api';
import { authenticate, isAuth } from '../../helpers/auth';
import FacebookLogin from 'react-facebook-login';

function LoginJWT(props) {

    const [userData, setUserData] = useState({
        email:'',
        password: ''
    })

    const sendFacebookToken = (userID, accessToken) => {
        facebookToken({userID, accessToken}).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const responseFacebook = response => {
        console.log(response);
        sendFacebookToken(response.userID, response.accessToken);
    }

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
        <div>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <FacebookLogin
                appId={FACEBOOK_API}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            />

        </div>
    );
}

export default LoginJWT;