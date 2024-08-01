// src/helpers/helpers.js
import axios from 'axios';

// Define API endpoints
const USERS_API_URL = '/api/admin/users';
const DELETE_USERS_API_URL = '/api/admin/users/';
const ADMIN_LOGOUT = '/api/logout/';

const token = localStorage.getItem('token')

const getAllUsers = async (search = '', page = 1, perPage = 10) => {
    try {
        const response = await axios.get(USERS_API_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            params: {
                search: search,
                page: page,
                perPage: perPage
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const deleteUsers = async (userId) => {
    try {
        const response = await axios.delete(DELETE_USERS_API_URL + userId,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const logout = async () => {
    try {
        const response = await axios.post(ADMIN_LOGOUT ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


export const UserHelper = {
    getAllUsers,
    deleteUsers,
    logout
};
