import Axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import { facebookToken, FACEBOOK_API, loginUser } from '../../api';
import { authenticate, isAuth } from '../../helpers/auth';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import './Login.scss';

import Header from '../../components/UI/Header';
import topLogo from '../../assets/Images/main-logo.png';
import { listUser, readUser } from '../../api';
import * as yub from 'yup';

import './style.scss';
import { FastField, Form, Formik } from 'formik';
import InputField from '../../custom-fields/InputField';



function LoginJWT(props) {

    const [state, setState] = useState({ message: '', name: '' });
    const [chat, setChat] = useState([]);

    const history = useHistory();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const initialValues = {
        email: '',
        password: '',
    }

    const validateSchema = yub.object().shape({
        email: yub.string()
            .max(100, "Maximum 100 characters")
            .email("Invalid email form")
            .required("This field is required"),
        password: yub.string()
            .min(6, "Password is too short - should be 8 chars minimum.")
            .max(50, "Maximum 50 characters")
            .required('This field is required'),
    })


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

    const handleLogin = (values) => {
        //e.preventDefault();
        if (values) {
            loginUser(values).then(res => {
                authenticate(res, () => {

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

                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => handleLogin(values)}
                                validationSchema={validateSchema}
                            >
                                {
                                    formikValues => {
                                        return (
                                            <Form>
                                                <FastField
                                                    name="email"
                                                    component={InputField}
                                                    type="email"
                                                    label="Email"
                                                    placeholder="Type your email address..."
                                                />
                                                <FastField
                                                    name="password"
                                                    component={InputField}

                                                    type="password"
                                                    label="Password"
                                                    placeholder="Type your password..."
                                                />
                                                <button type="submit" className="btn btn-link" >Submit</button>
                                            </Form>
                                        )
                                    }
                                }
                            </Formik>

                            {/* <form onSubmit={handleLogin}>
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
                            </form> */}

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