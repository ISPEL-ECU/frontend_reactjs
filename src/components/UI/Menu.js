import React, { useState } from 'react';

import { slide as Menu } from 'react-burger-menu';
import history from '../../history';
import { useAuth } from '../../context/auth';


const SideNav = (props) => {
    const { authToken, setAuthToken } = useAuth();
    const { authLevel, setAuthLevel } = useAuth();

    function logOut() {
        setAuthToken('null');
        setAuthLevel('null');
    }

    const AuthorizedMenu = () => {

        if (authToken != 'null') {
            console.log('????????????????????????', authLevel);
            if (parseInt(authLevel) < 3) {
                return (
                    <Menu>
                        <a id="createCourse" className="menu-item" href="/">Create course</a>
                        <a id="topics" className="menu-item" href="/browse-topics">View topics</a>
                        <a id="courses" className="menu-item" href="/topics">View courses</a>
                        <a id="logout" className="menu-item" href="#" onClick={logOut}  >Logout</a>
                    </Menu>
                );
            }
            return (
                <Menu>
                    <a id="topics" className="menu-item" href="/browse-topics">View topics</a>
                    <a id="courses" className="menu-item" href="/topics">View courses</a>
                    <a id="logout" className="menu-item" href="#" onClick={logOut}  >Logout</a>
                </Menu>);
        }
        return (
            <Menu>
                <a id="login" className="menu-item" href="/login">Login</a>
            </Menu>
        );
    }

    return (

        <AuthorizedMenu />



    )
}

export default SideNav;