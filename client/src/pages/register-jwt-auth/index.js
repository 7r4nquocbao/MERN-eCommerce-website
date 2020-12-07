import Axios from 'axios';
import React, { useState } from 'react';
import {toast} from 'react-toastify';
import { registerUser } from '../../api';
import {Formik, Form, FastField} from 'formik';
import * as Yup from 'yup'


import './Register.scss';
import InputField from '../../custom-fields/InputField';
import RadioField from '../../custom-fields/RadioField';
import { Button } from 'reactstrap';
import DatePickerField from '../../custom-fields/DatePickerField';

import Header from '../../components/UI/Header';
import topLogo from '../../assets/Images/main-logo.png'
import { Link } from 'react-router-dom';

function RegisterJWTAuth(props) {
    const initialValues = {
        name: '',
        gender: 'male',
        email: '',
        //birthday: '',
        password: '',
        confirm: '',
        address: '',
        phone: '',

    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(50, "Maximum 50 characters")
        .required('This field is required'),

        email: Yup.string()
        .email("Invalid email format")
        .required('This field is required'),

        password: Yup.string()
        .min(6, "Password is too short - should be 8 chars minimum.")
        .max(50, "Maximum 50 characters")
        .required('This field is required'),

        confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('This field is required'),

        address: Yup.string()
        .min(10, "Invalid address")
        .max(200, "Maximum 100 characters")
        .required('This field is required'),

        phone: Yup.number()
        .required('This field is required'),
    })

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
            <Header/>
            <div className="register">
            
            <div className="register__opacity">
                <div className="register__main">
                    <div className="d-flex justify-content-center pt-2">
                        <Link to="/">
                            <img src={topLogo} width={120} height={100}/>
                        </Link>
                        
                    </div>
                    <div className="register__title">
                        Register
                    </div>

                    <Formik
                        initialValues = {initialValues}
                        onSubmit = {(values) => console.log("abc",values)}
                        validationSchema={validationSchema}
                    >
                        {
                            formikValues => {
                                //do something
                                
                                return(
                                    <Form>
                                        <FastField
                                            name="name"
                                            component={InputField}

                                            label="Name"
                                            placeholder="Type your Name..."
                                        />
                                        <div className="d-flex">
                                        <FastField
                                            name="gender"
                                            component={RadioField}

                                            label="Male"
                                            id="male"
                                        />
                                        <FastField
                                            name="gender"
                                            component={RadioField}

                                            label="Female"
                                            id="female"
                                        />
                                        </div>
                                        
                                        {/* <FastField
                                            name="birthday"
                                            component={DatePickerField}

                                            label="Date of birth"
                                            placeholder="dd/mm/yyyy"
                                        /> */}
                                        <FastField
                                            name="email"
                                            component={InputField}

                                            type="email"
                                            label="Email"
                                            placeholder="Type your Email..."
                                        />
                                        <FastField
                                            name="password"
                                            component={InputField}
                                            
                                            type="password"
                                            label="Password"
                                            placeholder="Type your Password..."
                                        />
                                        <FastField
                                            name="confirm"
                                            component={InputField}

                                            type="password"
                                            label="Confirm password"
                                            placeholder="Type your Confirm password..."
                                        />
                                        <FastField
                                            name="address"
                                            component={InputField}

                                            label="Address"
                                            placeholder="Type your Address..."
                                        />
                                         <FastField
                                            name="phone"
                                            component={InputField}

                                            type="tel"
                                            label="Phone number"
                                            placeholder="Type your phone number..."
                                        />

                                        <Button type="submit">Submit</Button>
                                        <Link className="back-to" to="/login">Back to Login</Link>
                                    </Form>
                                )
                            }
                        }
                    </Formik>

                    {/* <form>
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
                        <button onClick={handleSubmit} className="btn btn-link">Submit</button>
                    </form> */}
                </div>
            </div>
            {console.log(userData)}
            
        </div>
        </div>
        
    );
}

export default RegisterJWTAuth;