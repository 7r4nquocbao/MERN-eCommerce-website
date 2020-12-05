import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../api';
import { ToastContainer, toast } from 'react-toastify';

function ResetPasswordJWT(props) {

    const params = useParams();
    const { token } = params;
    const [newPassword, setNewPassword] = useState('');
    
    const handleRequest = e => {
        e.preventDefault();
        if(newPassword) {
            resetPassword({newPassword: newPassword, resetPasswordLink: token}).then(res => {
                setNewPassword('');
                toast.success(`Ok`);
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log('Password is required');
        }
    }
    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleRequest}>
                <div className="form-group">
                    <label htmlFor="password">New password</label>
                    <input type="password" className="form-control" id="password"
                        onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ResetPasswordJWT;