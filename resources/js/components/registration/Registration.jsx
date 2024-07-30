import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/slices/authSlice';
import { Formik, Field, ErrorMessage } from 'formik';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { validateRegistration } from '../mixin/validateRegistration';
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector((state) => state.auth);
    const [showPasswords, setShowPasswords] = useState({ password: false, confirmPassword: false });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const resultAction = await dispatch(registerUser(values));
            if (resultAction.payload?.user) {
                setSuccessMessage('User created successfully!');
                setTimeout(() => setSuccessMessage(''), 2000);
            }
        } catch (error) {
            console.error('Create user failed:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const toggleShowPassword = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="registration-box bg-white p-4 rounded shadow">
                <h2 className="text-center mb-4">Registration</h2>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {error && !successMessage && <div className="alert alert-danger">{error}</div>}
                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                    validate={validateRegistration}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field type="text" id="name" name="name" className="form-control" />
                                <ErrorMessage name="name" component="div" className={styles.error} />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="email">Email</label>
                                <Field type="email" id="email" name="email" className="form-control" />
                                <ErrorMessage name="email" component="div" className={styles.error} />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="password">Password</label>
                                <div className={`input-group ${styles.inputGroup}`}>
                                    <Field
                                        type={showPasswords.password ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        className={`btn input-group-text ${styles.noHover}`}
                                        onClick={() => toggleShowPassword('password')}
                                    >
                                        <FontAwesomeIcon icon={showPasswords.password ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className={styles.error} />
                            </div>
                            <div className="form-group mt-4">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className={`input-group ${styles.inputGroup}`}>
                                    <Field
                                        type={showPasswords.confirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        className={`btn input-group-text ${styles.noHover}`}
                                        onClick={() => toggleShowPassword('confirmPassword')}
                                    >
                                        <FontAwesomeIcon icon={showPasswords.confirmPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting || loading}>
                                    {isSubmitting || loading ? 'Submitting...' : 'Submit'}
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
