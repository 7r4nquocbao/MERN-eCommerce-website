import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { activeUser } from '../../api';

function ActivationJWT(props) {

    const params = useParams();
    const { token } = params;

    const handleActive = e => {
        e.preventDefault();
        activeUser({ token: token }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <button onClick={handleActive} className="btn btn-danger">Click me~~~</button>
        </div>
    );
}

export default ActivationJWT;