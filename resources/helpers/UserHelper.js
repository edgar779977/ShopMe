// src/helpers/helpers.js
import axios from 'axios';

const USERS_API_URL = '/api/users'; // Replace with your users API URL
const CARS_API_URL = 'https://api.example.com/cars'; // Replace with your cars API URL

const getAllUsers = async () => {

    const token = localStorage.getItem('token')

    try {
        const response = await axios.get(USERS_API_URL,{
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
};
