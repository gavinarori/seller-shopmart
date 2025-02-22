import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api/api';

interface DashboardState {
    totalSale: number;
    totalOrder: number;
    totalProduct: number;
    totalPendingOrder?: number;
    totalSeller?: number;
    recentOrders: any[];
    recentMessage: any[];
    errorMessage?: string;
    successMessage?: string;
}

interface DashboardData {
    totalSale: number;
    totalOrder: number;
    totalProduct: number;
    totalPendingOrder?: number;
    totalSeller?: number;
    recentOrders: any[];
    messages: any[];
}

export const get_seller_dashboard_index_data = createAsyncThunk<
    DashboardData,
    void,
    { rejectValue: any }
>('dashboardIndex/get_seller_dashboard_index_data', async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get<DashboardData>('/seller/get-dashboard-index-data', { withCredentials: true });
        console.log(data);
        return fulfillWithValue(data);
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

export const get_admin_dashboard_index_data = createAsyncThunk<
    DashboardData,
    void,
    { rejectValue: any }
>('dashboardIndex/get_admin_dashboard_index_data', async (_, {  rejectWithValue, fulfillWithValue }) => {
    try {
        const { data } = await api.get<DashboardData>('/admin/get-dashboard-index-data', { withCredentials: true });
        console.log(data);
        return fulfillWithValue(data);
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
});

const initialState: DashboardState = {
    totalSale: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalPendingOrder: 0,
    totalSeller: 0,
    recentOrders: [],
    recentMessage: [],
    errorMessage: '',
    successMessage: '',
};

export const dashboardIndexReducer = createSlice({
    name: 'dashboardIndex',
    initialState,
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(get_seller_dashboard_index_data.fulfilled, (state, action: PayloadAction<DashboardData>) => {
            state.totalSale = action.payload.totalSale;
            state.totalOrder = action.payload.totalOrder;
            state.totalProduct = action.payload.totalProduct;
            state.totalPendingOrder = action.payload.totalPendingOrder;
            state.recentOrders = action.payload.recentOrders;
            state.recentMessage = action.payload.messages;
        });
        builder.addCase(get_admin_dashboard_index_data.fulfilled, (state, action: PayloadAction<DashboardData>) => {
            state.totalSale = action.payload.totalSale;
            state.totalOrder = action.payload.totalOrder;
            state.totalProduct = action.payload.totalProduct;
            state.totalSeller = action.payload.totalSeller;
            state.recentOrders = action.payload.recentOrders;
            state.recentMessage = action.payload.messages;
        });
    },
});

export const { messageClear } = dashboardIndexReducer.actions;
export default dashboardIndexReducer.reducer;
