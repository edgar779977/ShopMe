import React, { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import styles from "../registration/Login.module.scss";
import { createUser } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {validateRegistration} from "../mixin/validateRegistration"

function CreateUserModal({ show, handleClose, handleSave }) {
    const modalRef = useRef(null);
    const modalInstanceRef = useRef(null);
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (modalRef.current) {
            const modalInstance = new Modal(modalRef.current, {
                backdrop: 'static',
                keyboard: false,
            });

            modalInstanceRef.current = modalInstance;

            return () => {
                if (modalInstanceRef.current) {
                    modalInstanceRef.current.dispose();
                }
            };
        }
    }, []);

    useEffect(() => {
        const modal = modalInstanceRef.current;

        if (modal) {
            if (show) {
                modal.show();
            } else {
                modal.hide();
            }
        }
    }, [show]);

    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement) {
            const handleCloseEvent = () => handleClose();
            modalElement.addEventListener('hidden.bs.modal', handleCloseEvent);

            return () => {
                if (modalElement) {
                    modalElement.removeEventListener('hidden.bs.modal', handleCloseEvent);
                }
            };
        }
    }, [handleClose]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Dispatch the createUser action and await the result
            const resultAction = await dispatch(createUser({
                name: values.name,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            }));

            // Check if the action was fulfilled
            if (createUser.fulfilled.match(resultAction)) {
                // If fulfilled, set the success message and handle save
                setSuccessMessage('User created successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    handleClose();
                }, 2000); // Hide the modal after 2 seconds
            } else {
                // If rejected, handle the error
                console.error('Create user failed:', resultAction.payload);
                // You might want to show the error to the user here
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setSubmitting(false);
        }
    };


    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    };

    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1" aria-labelledby="createUserModalLabel" aria-hidden={!show}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createUserModalLabel">Create User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {successMessage && (
                            <div className="alert alert-success">
                                {successMessage}
                            </div>
                        )}
                        {error && !successMessage && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}
                        <Formik
                            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
                            validate={validateRegistration}
                            onSubmit={handleSubmit}
                        >
                            {({ handleSubmit, isSubmitting }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`form-control`}
                                        />
                                        <ErrorMessage name="name" component="div" className={styles.error} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="email">Email</label>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`form-control`}
                                        />
                                        <ErrorMessage name="email" component="div" className={styles.error} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="password">Password</label>
                                        <div className={`input-group ${styles.inputGroup}`}>
                                            <Field
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                className={`form-control`}
                                            />
                                            <button
                                                type="button"
                                                className={`btn input-group-text ${styles.noHover}`}
                                                onClick={toggleShowPassword}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </button>
                                        </div>
                                        <ErrorMessage name="password" component="div" className={styles.error} />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <div className={`input-group ${styles.inputGroup}`}>
                                            <Field
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className={`form-control`}
                                            />
                                            <button
                                                type="button"
                                                className={`btn input-group-text ${styles.noHover}`}
                                                onClick={toggleShowConfirmPassword}
                                            >
                                                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
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
            </div>
        </div>
    );
}

export default CreateUserModal;
