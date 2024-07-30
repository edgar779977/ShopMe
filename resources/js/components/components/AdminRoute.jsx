import React, {Suspense,useEffect, useState, useContext} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import IsMobileContext from '../../../contexts/IsMobileContext';
import Sidebar from '../admin/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';

const AdminRoute = ({children}) => {
    const {isAuthenticated, user,isAdmin} = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const {isMobile} = useContext(IsMobileContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!isAuthenticated) {
            navigate('/login');
        } else if (isAuthenticated && !isAdmin) {
            navigate('/');
        }

    }, [isAuthenticated, user, navigate]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const Logout = () => {
        dispatch(logoutUser());
    };

    return (
        isAuthenticated && isAdmin ? (
            <>
                <div className={`m-4 gap-4 d-flex ${!isMobile ? 'justify-content-between admin-route-container' : 'flex-column'}`}>
                    <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} isMobile={isMobile}/>
                    <button type="button" className="btn btn-secondary" onClick={Logout}> Logout</button>
                </div>
                <div className={`admin-content ${isOpen ? 'expanded' : 'collapsed'}`} style={{
                    marginLeft: isOpen && !isMobile ? '200px' : '0',
                    transition: 'margin 0.5s ease',
                    overflowY: 'auto', // Enable vertical scrolling
                    maxHeight: 'calc(100vh - 100px)', // Adjust based on your layout and sidebar height
                    paddingRight: '15px' // Add some space for scrollbar
                }}>
                    <div className={'container'}>
                        {children}
                    </div>
                </div>
            </>

        ) : null
    );
};

export default AdminRoute;
