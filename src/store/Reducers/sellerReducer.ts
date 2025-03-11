import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api/api';

interface Seller {
    id: string;
    name: string;
    email: string;
    status: string;
    // Add other necessary fields
}

interface SellerState {
    successMessage: string;
    errorMessage: string;
    loader: boolean;
    sellers: Seller[];
    totalSeller: number;
    seller: Seller | null;
}

interface PaginationParams {
    parPage: number;
    page: number;
    searchValue: string;
}

interface StatusUpdateInfo {
    sellerId: string;
    status: string;
}

export const get_seller_request = createAsyncThunk(
    'seller/get_seller_request',
    async (params: PaginationParams, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/request-seller-get?page=${params.page}&&searchValue=${params.searchValue}&&parPage=${params.parPage}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_seller = createAsyncThunk(
    'seller/get_seller',
    async (sellerId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-seller/${sellerId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const seller_status_update = createAsyncThunk(
    'seller/seller_status_update',
    async (info: StatusUpdateInfo, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/seller-status-update`, info, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_active_sellers = createAsyncThunk(
    'seller/get_active_sellers',
    async (params: PaginationParams, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-sellers?page=${params.page}&&searchValue=${params.searchValue}&&parPage=${params.parPage}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_deactive_sellers = createAsyncThunk(
    'seller/get_deactive_sellers',
    async (params: PaginationParams, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/get-deactive-sellers?page=${params.page}&&searchValue=${params.searchValue}&&parPage=${params.parPage}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);





const initialState: SellerState = {
    successMessage: '',
    errorMessage: '',
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: null,
};

export const sellerReducer = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_seller_request.fulfilled, (state, action: PayloadAction<{ sellers: Seller[], totalSeller: number }>) => {
                state.sellers = action.payload.sellers;
                state.totalSeller = action.payload.totalSeller;
            })
            .addCase(get_seller.fulfilled, (state, action: PayloadAction<{ seller: Seller }>) => {
                state.seller = action.payload.seller;
            })
            .addCase(seller_status_update.fulfilled, (state, action: PayloadAction<{ seller: Seller, message: string }>) => {
                state.seller = action.payload.seller;
                state.successMessage = action.payload.message;
            })
            .addCase(get_active_sellers.fulfilled, (state, action: PayloadAction<{ sellers: Seller[], totalSeller: number }>) => {
                state.sellers = action.payload.sellers;
                state.totalSeller = action.payload.totalSeller;
            })
            .addCase(sellerReducer.actions.messageClear, (state) => {
                state.errorMessage = "";
                state.successMessage = "";
            });
    }
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
