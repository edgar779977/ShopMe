import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../store/slices/authSlice';
import {Formik, Field, ErrorMessage} from 'formik';
import {useLocation, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.module.scss';

const Login = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const {user,loading, error} = useSelector((state) => state.auth);
    const navigate = useNavigate()

    useEffect(() => {

        if (user && !user.isAdmin) {
            navigate('/')
        }

        if (user?.isAdmin){
            navigate('/admin/dashboard')
        }


    }, [user])

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = async (values) => {
        try {
            const user = await dispatch(loginUser({email: values.email, password: values.password}));
            if (user.payload.user.email === 'asdasdasdasd@gmail.com') {
                console.log(11111)
                navigate('/admin/dashboard')
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login error (display error message, etc.)
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="login-box bg-white p-4 rounded shadow">
                <h2 className="text-center mb-4">Login</h2>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group user-box">
                                <label>Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={`form-control`}
                                    required
                                />
                                <ErrorMessage name="email" component="div" className={styles.error}/>
                            </div>
                            <div className="form-group user-box mt-4">
                                <label>Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className={`form-control`}
                                    required
                                />
                                <ErrorMessage name="password" component="div" className={styles.error}/>
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                                {error && <div className="text-danger mt-2">{error}</div>}
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
