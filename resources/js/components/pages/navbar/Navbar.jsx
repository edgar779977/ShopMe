import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { logoutUser } from '../../../store/slices/authSlice'; // Adjust the path as necessary

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const user = useSelector(state => state.auth.user);

    const handleLogin = () => {
        navigate('/login', { state: { from: '/home' } });
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex ms-auto" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    {
                        !user ?
                            <div className="d-flex ms-3">
                                <button className="btn btn-outline-light me-2" type="button" onClick={handleLogin}>Login</button>
                                <button className="btn btn-outline-light" type="button" onClick={handleSignup}>Signup</button>
                            </div>
                            :
                            <button className="btn btn-outline-light" type="button" onClick={handleLogout}>Logout</button>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
