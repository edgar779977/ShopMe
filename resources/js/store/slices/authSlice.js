import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAdmin: localStorage.getItem('isAdmin') ? JSON.parse(localStorage.getItem('isAdmin')) : null,
    isAuthenticated: localStorage.getItem('user') ? true : false,
    loading: false,
    error: null,
    users: [], // List of users
    usersLoading: false, // Loading state for user list
};

// Async action using createAsyncThunk to login user
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/login', {email, password});
            const data = response.data;
            if (data.token && data.user){
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token); // Store token if applicable
                localStorage.setItem('isAdmin', data.isAdmin); // Store token if applicable
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async action using createAsyncThunk to register user
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({email, password, name}, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/register', {email, password, name});
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
            localStorage.setItem('token', user.token); // Store token if applicable
            return user;
        } catch (error) {
            return rejectWithValue(error.response.data); // Pass server error message to the reducer
        }
    }
);

// Async action using createAsyncThunk to create user
export const createUser = createAsyncThunk(
    'auth/createUser',
    async ({email, password, name}, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/admin/users', {email, password, name}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error creating user:', error.response || error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, {rejectWithValue}) => {
        try {
            await axios.post('/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');

            return {}; // Return empty object or any relevant data if needed
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
            localStorage.setItem('token', action.payload.token); // Store token if applicable
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login reducers
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Login failed';
            })
            // Registration reducers
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Registration failed';
            })
            // Create user reducers
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                // Update user list if needed
                state.users.push(action.payload);
                state.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'User creation failed';
            })
            // Logout reducers
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Logout failed';
            });
    },
});

export const {setUser} = authSlice.actions;

export default authSlice.reducer;
