import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { resetPassword } from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import '../register-jwt-auth/Register.scss';
import Header from '../../components/UI/Header';

function ResetPasswordJWT(props) {

    const params = useParams();
    const { token } = params;
    const [newPassword, setNewPassword] = useState('');

    const handleRequest = e => {
        e.preventDefault();
        if (newPassword) {
            resetPassword({ newPassword: newPassword, resetPasswordLink: token }).then(res => {
                setNewPassword('');
                toast.success(`Ok`);
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log('Password is required');
        }
    }

    useEffect(() => {
        document.title = 'RESET PASSWORD';
    }, [])

    return (
        <div>
            <Header />
            <div className="register">
                <div className="register__opacity">
                    <div className="register__main">
                        <div className="register__title">
                            Reset Password
                        </div>
                        <ToastContainer />
                        <form onSubmit={handleRequest}>
                            <div className="form-group">
                                <label htmlFor="password">New password</label>
                                <input type="password" className="form-control" id="password" placeholder="Type your new password..."
                                    onChange={(e) => setNewPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-link">Submit</button>

                        </form>
                    </div>

                </div>

            </div>
        </div>

    );
}

export default ResetPasswordJWT;