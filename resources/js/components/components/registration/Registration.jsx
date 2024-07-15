import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../store/authSlice';
import { Formik, Field, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Registration.module.scss';

const Registration = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Email is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }
        if (!values.name) {
            errors.name = 'Name is required';
        }
        return errors;
    };

    const handleSubmit = async (values) => {
        try {
            await dispatch(registerUser({ email: values.email, password: values.password, name: values.name }));
            // Redirect or perform other actions upon successful registration
        } catch (err) {
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="registration-box bg-white p-4 rounded shadow">
                <h2 className="text-center mb-4">Registration</h2>
                <Formik
                    initialValues={{ email: '', password: '', name: '' }}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group user-box">
                                <label>Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={`form-control`}
                                    required
                                />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>
                            <div className="form-group user-box mt-4">
                                <label>Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className={`form-control`}
                                    required
                                />
                                <ErrorMessage name="password" component="div" className={styles.error} />
                            </div>
                            <div className="form-group user-box mt-4">
                                <label>Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className={`form-control`}
                                    required
                                />
                                <ErrorMessage name="name" component="div" className={styles.error} />
                            </div>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Registration;
