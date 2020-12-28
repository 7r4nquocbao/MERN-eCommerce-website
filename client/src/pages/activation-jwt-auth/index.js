import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { activeUser } from '../../api';
import { uiLoading } from '../../App';
import './JWT.scss';

function ActivationJWT(props) {

    useEffect(() => {
        document.title = 'Activation Account';
    }, [])

    const params = useParams();
    const history = useHistory();
    const { token } = params;

    const handleActive = e => {
        e.preventDefault();
        uiLoading(true);
        activeUser({ token: token }).then(res => {
            console.log(res);
            uiLoading(false);
            history.push('/');
        }).catch(err => {
            console.log(err);
            toast.error('Error');
        })
    }

    return (
        <div className="submit">
            <button title="active account" onClick={handleActive} className="btn btn-danger click-me">Click me~~~</button>
            <p>Click the button to active Account</p>
        </div>
    );
}

export default ActivationJWT;