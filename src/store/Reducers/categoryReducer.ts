import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api/api';

interface Category {
    id: string;
    name: string;
    image: string;
}

interface CategoryState {
    successMessage: string;
    errorMessage: string;
    loader: boolean;
    categorys: Category[];
    totalCategory: number;
}

interface CategoryAddPayload {
    name: string;
    image: File;
}

interface GetCategoryPayload {
    parPage: number;
    page: number;
    searchValue: string;
}

export const categoryAdd = createAsyncThunk(
    'category/categoryAdd',
    async ({ name, image }: CategoryAddPayload, { rejectWithValue, fulfillWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);
            const { data } = await api.post('/category-add', formData, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);

export const get_category = createAsyncThunk(
    'category/get_category',
    async ({ parPage, page, searchValue }: GetCategoryPayload, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
            console.log("API Response:", data); 
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'An error occurred');
        }
    }
);


const initialState: CategoryState = {
    successMessage: '',
    errorMessage: '',
    loader: false,
    categorys: [],
    totalCategory: 0
};

export const categoryReducer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(categoryAdd.pending, (state) => {
                state.loader = true;
            })
            .addCase(categoryAdd.rejected, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.errorMessage = action.payload?.error || 'An error occurred';
            })
            .addCase(categoryAdd.fulfilled, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.successMessage = action.payload.message;
                state.categorys = [...state.categorys, action.payload.category];
            })
            .addCase(get_category.fulfilled, (state, action: PayloadAction<any>) => {
                state.totalCategory = action.payload.totalCategory;
                state.categorys = action.payload.categorys || [];

            });
    }
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
