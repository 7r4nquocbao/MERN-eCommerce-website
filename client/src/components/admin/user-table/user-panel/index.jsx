import React, { useEffect, useState } from 'react';
import { readUser, viewUser } from '../../../../api';
import { getCookie, isAuth } from '../../../../helpers/auth';
import Switch from '@material-ui/core/Switch';

function UserPanel(props) {

    const {userId} = props;
    console.log(userId);

    const [userInfo, setUserInfo] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        viewUser(userId).then(res => {
            // setUserInfo(res.data);
            // if(res.data.role === 'admin') {
            //     setIsAdmin(true);
            // } else {

            // }
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <Switch
                checked={isAdmin}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            {JSON.stringify(userInfo)}
        </div>
    );
}

export default UserPanel;