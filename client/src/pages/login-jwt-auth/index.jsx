import React from 'react';
import { useState } from 'react';
import { facebookToken, FACEBOOK_API, loginUser } from '../../api';
import { authenticate, isAuth } from '../../helpers/auth';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import './Login.scss';
import Header from '../../components/UI/Header';
import topLogo from '../../assets/Images/main-logo.png';

function LoginJWT(props) {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    // const sendFacebookToken = (userID, accessToken) => {
    //     facebookToken({userID, accessToken}).then(res => {
    //         console.log(res.data);
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    // const responseFacebook = response => {
    //     console.log(response);
    //     sendFacebookToken(response.userID, response.accessToken);
    // }

    const handleLogin = e => {
        e.preventDefault();
        if (userData.email && userData.password) {
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

        <div className="login">
            <Header />
            <div className="login__opacity">
                <div className="login__main">
                    <div className="login__main__left">
                        <div className="login__main_left__logo">
                            <Link to="/">
                                <img src={topLogo} width={200} height={180} />
                            </Link>
                        </div>
                    </div>
                    <div className="login__main__right">
                        <div className="login__main__right__content">
                            <div className="login__main__right__content__title">
                                Login
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Type your email..."
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Type your password..."
                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                                </div>
                                <button type="submit" className="btn btn-link">Submit</button>
                            </form>

                            <div className="login__register">
                                Register in here <Link to="/registerjwt">Register</Link><br />
                                <Link to="/reset">Forgot password?</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* <FacebookLogin
                appId={FACEBOOK_API}
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            /> */}

        </div>
    );
}

export default LoginJWT;