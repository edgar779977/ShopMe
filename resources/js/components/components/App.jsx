import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import Users from './admin/Users';
import ProductTable from './admin/product/ProductTable';
import Home from "./Home";
import NotFound404 from "./pages/NotFound";
import Login from "./registration/Login";

const App = () => {
    return (
        <Router>
            <Routes>
                {/*Admin Routes*/}
                <Route
                    path="admin/*"
                    element={
                        <AdminRoute>
                            <Routes>
                                <Route path="/" element={<Navigate to="users" replace />} />
                                <Route path="users" element={<Users />} />
                                <Route path="product" element={<ProductTable />} />
                                {/* Add more admin routes here */}
                                <Route path="*" element={<NotFound404 />} /> {/* Handle unknown routes */}
                            </Routes>
                        </AdminRoute>
                    }
                />

                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Router>
    );
};

export default App;
