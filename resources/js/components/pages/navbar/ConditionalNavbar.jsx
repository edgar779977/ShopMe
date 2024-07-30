import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const ConditionalNavbar = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return !isAdminRoute ? <Navbar /> : null;
};

export default ConditionalNavbar;
