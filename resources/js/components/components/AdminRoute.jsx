import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Sidebar from './admin/sidebar/Sidebar';

const AdminRoute = ({children}) => {
    const {isAuthenticated, user} = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navigate = useNavigate();

    useEffect(() => {

        if (!isAuthenticated) {
            navigate('/login');
        } else if (isAuthenticated && !user?.isAdmin) {
            navigate('/');
        }
    }, [isAuthenticated, user, navigate]);

    return (
        isAuthenticated && user?.isAdmin ? (

            <div className={'m-4 gap-4 d-flex justify-content-start admin-route-container'}>
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
                <div className={`w-100 admin-content ${isOpen ? 'expanded' : 'collapsed'}`} style={{
                    marginLeft: isOpen ? '200px' : '0',
                    marginRight: isOpen ?? '0',
                    transition: 'margin 0.5s ease'
                }}>
                    {children}
                </div>
            </div>
        ) : null
    );
};

export default AdminRoute;
