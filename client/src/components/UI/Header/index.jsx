import React, { useEffect, useState } from 'react';

import './Header.scss';

import { Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { getCookie, isAuth, signOut } from '../../../helpers/auth';
import { readUser } from '../../../api';

Header.propTypes = {

};

function Header(props) {

    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        checkLog();
    }, [])

    const checkLog = () => {
        const token = getCookie('token');
        readUser(isAuth()._id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setIsLogin(true);
        }).catch(err => {
            setIsLogin(false);
        })
    }

    const logOut = () => {
        setIsLogin(false);
        signOut();
    }

    const displayLog = () => {
        if (isLogin) {
            return <Link title="logout" onClick={() => logOut()}>Log Out</Link>
        } else {
            return <NavLink title="login" to="/login">Login</NavLink>
        }
    }

    return (

        <div className="header">
            <Col sm="auto">
                <div className="header__social">
                    <a title="instagram" target="_blank" href="https://www.instagram.com/"><i class="fab fa-instagram-square"></i></a>
                    <a title="facebook" target="_blank" href="https://www.facebook.com/"><i class="fab fa-facebook-square"></i></a>
                    <a title="twitter" target="_blank" href="https://twitter.com/?lang=vi"><i class="fab fa-twitter-square"></i></a>
                    <a title="behance" target="_blank" href="https://www.behance.net/"><i class="fab fa-behance-square"></i></a>
                    <a title="reddit" target="_blank" href="https://www.reddit.com/"><i class="fab fa-reddit"></i></a>
                </div>

            </Col>
            <Col sm="auto">
                {displayLog()}

                <span>/</span>
                <NavLink title="register" to="/registerjwt">Register</NavLink>
            </Col>
        </div >

    );
}

export default Header;