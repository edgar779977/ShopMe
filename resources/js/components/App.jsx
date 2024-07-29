// noinspection JSCheckFunctionSignatures

import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
const Users = lazy(() => import('./admin/Users'));
const ProductTable = lazy(() => import('./admin/Product'));
const Home = lazy(() => import('./components/Home'));
const NotFound404 = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./registration/Login'));

const App = () => {
    return (
        <Router>
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
                        <div className="spinner-border" role="status" style={{ marginRight: '10px' }}>
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
                                    {/* Add more admin routes here */}
                                    <Route path="*" element={<NotFound404/>}/> {/* Handle unknown routes */}
                                </Routes>
                            </AdminRoute>
                        }
                    />
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<NotFound404/>}/> {/* Handle unknown routes */}
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
