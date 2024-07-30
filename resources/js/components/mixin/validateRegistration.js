export const validateRegistration = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is required';
    } else if (values.name.length < 6) {
        errors.name = 'The name must be at least 6 characters.';
    }
    if (!values.email) {
        errors.email = 'Email is required';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'The password must be at least 8 characters.';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm password is required';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
};
