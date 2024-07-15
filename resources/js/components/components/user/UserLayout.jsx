import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const UserLayout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/user/profile">User Profile</Link></li>
                    <li><Link to="/user/settings">User Settings</Link></li>
                </ul>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default UserLayout;
