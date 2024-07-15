import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    if (!isAuthenticated || user.role !== 'user') {
        return <Navigate to="/" />;
    }

    return children;
};

export default UserRoute;
