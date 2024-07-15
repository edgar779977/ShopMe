import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Sidebar.module.scss'; // Import your SCSS module

const Sidebar = ({isOpen, toggleSidebar}) => {
    const routes = [
        {path: 'users', label: 'Users'},
        {path: 'product', label: 'Product'}
        // Add more routes as needed
    ];

    return (
        <>
            <button
                className={`btn mt-0 ${styles.sidebarToggle}`}
                type="button"
                onClick={toggleSidebar}
            >
                <i className="fa fa-bars" aria-hidden="true"></i>
            </button>

            <div
                className={`${styles.offcanvas} ${isOpen ? styles.show : ''}`}
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div className={styles.offcanvasHeader}>
                    <h5 className={styles.offcanvasTitle} id="offcanvasExampleLabel">Admin</h5>
                    <button
                        type="button"
                        className={`btn p-0 ${styles.closeButton}`}
                        onClick={toggleSidebar}
                    >
                        <i className="fa fa-close" style={{fontSize:'20px',color: 'white'}}></i>
                    </button>
                </div>
                <div className={styles.offcanvasBody}>
                    {routes.map((route, index) => (
                        <NavLink
                            key={index}
                            to={route.path}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.active : ''}`
                            }
                            replace
                        >
                            {route.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
