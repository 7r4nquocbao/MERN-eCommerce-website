import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
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
import Select from 'react-select'

function RegisterJWTAuth(props) {

    const [dateOptions, setDateOptions] = useState({
        dates: [],
        months: [],
        years: []
    })

    useEffect(() => {
        createDateOptions();
    }, [])

    const initialValues = {
        name: '',
        gender: 'male',
        email: '',
        birthday: JSON.stringify(new Date()),
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

    const handleSubmit = (val) => {
        console.log(val);
        registerUser(val).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const createDateOptions = () => {

        let dates = [];
        let months = [];
        let years = [];

        for (let index = 0; index <= new Date().getFullYear() - 1910; index++) {
           if(index < 12) {
               months.push({ value: index, label: index + 1 });
           }
           if(index < 31) {
               dates.push({ value: index, label: index + 1 });
           }
           years.push({ value: index + 1900, label: index + 1900 });
        }

        years.reverse();

        setDateOptions({dates, months, years});
    }

    return (
        <div>
            <Header/>
            <div className="register">
            
            {/* <div className="register__opacity">
            </div> */}

            <div className="">

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
                        onSubmit = {(data) => handleSubmit(data)}
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
                                        <p className="mb-2">Date of Birth</p>
                                        <div className="form-row mb-3">
                                            <div className="col">
                                                <Select options={dateOptions.dates} 
                                                defaultValue={{value: 1, label: 1}}/>
                                            </div>
                                            <div className="col">
                                                <Select options={dateOptions.months} 
                                                defaultValue={{value: 1, label: 1}}/>
                                            </div>
                                            <div className="col">
                                                <Select options={dateOptions.years}
                                                    onChange={(value) => console.log(value.value)}
                                                    defaultValue={{value: 1900, label: 1900}}
                                                />
                                            </div>
                                        </div>
                                        <FastField
                                            name="address"
                                            component={InputField}

                                            label="Address"
                                            placeholder="Type your Address..."
                                        />
                                            <FastField
                                            name="phone"
                                            component={InputField}

                                            type="text"
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
                </div>
            </div>
            
        </div>
        </div>
        
    );
}

export default RegisterJWTAuth;