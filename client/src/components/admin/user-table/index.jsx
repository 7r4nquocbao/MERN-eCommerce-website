import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { listUser, setAdmin, viewUser } from '../../../api';
import {getCookie, isAuth} from '../../../helpers/auth'
import UserPanel from './user-panel';
import Switch from '@material-ui/core/Switch';
import './style.scss';

function UserTable(props) {

    const [tab, setTab] = useState(0);
    const [userData, setUserData] = useState([]);
    const [userView, setUserView] = useState('');
    const [userInfo, setUserInfo] = useState({
        name: '',
        gender: '',
        phone: '',
        address: '',
        birthday: {
            date: 1,
            month: 1,
            year: 1900
        },
        lastLogin: ''
    });
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = getCookie('token');
        listUser(isAuth()._id,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setUserData(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const displayUsers = () => {
        let data = [];
        if(tab === 0) {
            data = userData.filter(item => item.role === 'admin');
        } else {
            data = userData.filter(item => item.role === 'customer');
        }

        return (
            data && data.map((item, index) => {
                return (
                    <tr key={index}>
                        <td><button className="btn btn-sm btn-secondary" onClick={(id) => view(item._id)}>View</button></td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                    </tr>
                )
            })
        )
    }

    const view = (id) => {
        viewUser(id).then(res => {
            setUserInfo(res.data);
            if(res.data.role === 'admin') {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const setCusToAd = (id) => {
        setAdmin(id).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const dateFormat = (date) => {
        const dateTime = new Date(date);
        const dateString = dateTime.toLocaleDateString();;
        const timeString = dateTime.toLocaleTimeString();
        return `${dateString} ${timeString}`;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-9">
                    <div className="user-tab">
                        <Tabs
                            value={tab}
                            indicatorColor="secondary"
                            textColor="secondary"
                            onChange={(e, value) => setTab(value)}
                            style={{marginBottom: '10px'}}
                        >
                            <Tab label="Admin" style={{fontFamily: 'Cabin'}}/>
                            <Tab label="Customer" style={{fontFamily: 'Cabin'}}/>
                        </Tabs>
                        <div className="account-panel list-user-panel">
                            <table className="table table-hover table-borderless">
                                <tbody>
                                    {displayUsers()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col">
                <div>
                    <div className={`user-panel-shadow ${userInfo.name === '' ? 'hidden' : ''}`}>
                        <div className="info-row">
                            <label>Name</label>
                            <p>{userInfo.name}</p>
                        </div>
                        <div className="info-row">
                            <label className="mr-3">Gender</label>
                            <span><p style={{textTransform: 'capitalize'}}>{userInfo.gender}</p></span>
                        </div>
                        <div className="info-row">
                            <label className="mr-3">Birthday</label>
                            <p>{userInfo.birthday.date}/{userInfo.birthday.month}/{userInfo.birthday.year}</p>
                        </div>
                        <div className="info-row">
                            <label>Phone</label>
                            <p>{userInfo.phone}</p>
                        </div>
                        <div className="info-row">
                            <label>Address</label>
                            <p>{userInfo.address}</p>
                        </div>
                        <div className="info-row">
                            <label>Last Login</label>
                            <p>{dateFormat(userInfo.lastLogin)}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserTable;