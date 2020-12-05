import React, { useState } from 'react';
import { resetRequest } from '../../api';
import { ToastContainer, toast } from 'react-toastify';

function ResetRequestJWT(props) {

    const [email, setEmail] = useState('');
    
    const handleRequest = e => {
        e.preventDefault();
        if(email) {
            resetRequest({email}).then(res => {
                setEmail('');
                toast.success(`Please check your email`);
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log('Email is required');
        }
    }

    return (
        <div>
            <ToastContainer />
            <form onSubmit={handleRequest}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default ResetRequestJWT;