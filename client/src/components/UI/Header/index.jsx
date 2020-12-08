import React, { useEffect, useState } from 'react';

import './Header.scss';

import { Col } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
// import { fb, firestore } from '../../app/firebase';

Header.propTypes = {

};

function Header(props) {

    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [info, setInfo] = useState({})

    // useEffect(() => {
    //     fb.auth().onAuthStateChanged(function (user) {
    //         if (user) {

    //             firestore.collection("account-info").doc(user.uid).get().then(function (doc) {
    //                 if (doc.exists) {
    //                     setInfo(doc.data());
    //                 } else {
    //                     console.log("No such document!");
    //                 }
    //             }).catch(function (error) {
    //                 console.log("Error getting document:", error);
    //             });
    //             setIsLoggedIn(true);
    //         } else {
    //             // No user is signed in.
    //         }
    //     });
    // })

    // const logOut = () => {
    //     fb.auth().signOut().then(function () {
    //         localStorage.clear();
    //     }).catch(function (error) {
    //         // An error happened.
    //     });
    //     localStorage.removeItem('user');
    //     setIsLoggedIn(false);
    // }

    return (

        <div className="header">
            <Col sm="auto">
                <div className="header__social">
                    <NavLink to=""><i class="fab fa-instagram-square"></i></NavLink>
                    <NavLink to=""><i class="fab fa-facebook-square"></i></NavLink>
                    <NavLink to=""><i class="fab fa-twitter-square"></i></NavLink>
                    <NavLink to=""><i class="fab fa-behance-square"></i></NavLink>
                    <NavLink to=""><i class="fab fa-reddit"></i></NavLink>
                </div>

            </Col>
            <Col sm="auto">
                <NavLink to="/login">Login</NavLink>
                <span>/</span>
                <NavLink to="/registerjwt">Register</NavLink>
            </Col>
            {/* <Col sm="auto">
                <div>
                    {!isLoggedIn ? <NavLink to="/profile">{info.name}</NavLink> : ''}
                </div>
                <div className="header__authentication">
                    {
                        !isLoggedIn ? <NavLink to="/login">Login</NavLink>
                            : <NavLink to='' onClick={logOut}>Log out</NavLink>
                    }
                    <span>/</span>
                    <NavLink to="/register">Register</NavLink>
                </div>

            </Col> */}
        </div >

    );
}

export default Header;