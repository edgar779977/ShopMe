import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: localStorage.getItem('user') ? true : false,
    loading: false,
    error: null,
};


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', user.token);
            return user;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async action using createAsyncThunk to register user
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, name }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/register', { email, password, name });
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
            return user;
        } catch (error) {
            return rejectWithValue(error.response.data); // Pass server error message to the reducer
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
            localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in localStorage
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('user'); // Remove user data from localStorage
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
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in localStorage
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
                state.isAuthenticated = true; // Assuming registration logs in user automatically
                state.error = null;
                localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in localStorage
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.message : 'Registration failed';
            });
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
