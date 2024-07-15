import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategory = createAsyncThunk('category/fetchProducts', async () => {
    const response = await axios.get('/api/category'); // Adjust your API endpoint as necessary
    return response.data.product;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
