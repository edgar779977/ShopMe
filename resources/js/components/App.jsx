// noinspection JSCheckFunctionSignatures

import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import ConditionalNavbar from '../components/pages/navbar/ConditionalNavbar';
import AdminRoute from './components/AdminRoute';
import {AuthProvider} from '../../contexts/AuthContext';

// Lazy-loaded components
const Users = lazy(() => import('./admin/user/Users'));
const ProductTable = lazy(() => import('./admin/Product'));
const Home = lazy(() => import('./components/Home'));
const NotFound404 = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./registration/Login'));
const Registration = lazy(() => import('./registration/Registration'));

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <ConditionalNavbar/>
                <Suspense
                    fallback={
                        <div
                            className="d-flex justify-content-center align-items-center text-center vh-100"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div className="spinner-border" role="status" style={{marginRight: '10px'}}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            Loading...
                        </div>
                    }
                >
                    <Routes>
                        {/* Admin Routes */}
                        <Route
                            path="admin/*"
                            element={
                                <AdminRoute>
                                    <Routes>
                                        <Route path="/" element={<Navigate to="users" replace/>}/>
                                        <Route path="users" element={<Users/>}/>
                                        <Route path="product" element={<ProductTable/>}/>
                                        <Route path="*" element={<NotFound404/>}/>
                                    </Routes>
                                </AdminRoute>
                            }
                        />
                        {/* Public Routes */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/signup" element={<Registration/>}/>
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </Suspense>
            </Router>
        </AuthProvider>
    );
};

export default App;
