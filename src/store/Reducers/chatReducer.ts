import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api/api';

interface Message {
    receverId?: string;
    message: string;
}

interface Customer {
    fdId: string;
}

interface Seller {
    id: string;
}

interface ChatState {
    successMessage: string;
    errorMessage: string;
    customers: Customer[];
    messages: Message[];
    activeCustomer: Customer[];
    activeSellers: Seller[];
    messageNotification: any[];
    activeAdmin: string;
    friends: any[];
    seller_admin_message: Message[];
    currentSeller: Record<string, any>;
    currentCustomer: Record<string, any>;
    sellers: Seller[];
}

export const get_customers = createAsyncThunk(
    'chat/get_customers',
    async (sellerId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/seller/get-customers/${sellerId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_customer_message = createAsyncThunk(
    'chat/get_customer_message',
    async (customerId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/seller/get-customer-message/${customerId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const send_message:any = createAsyncThunk(
    'chat/send_message',
    async (info: Message, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/seller/send-message-to-customer`, info, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_sellers = createAsyncThunk(
    'chat/get_sellers',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/admin/get-sellers`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const send_message_seller_admin:any = createAsyncThunk(
    'chat/send_message_seller_admin',
    async (info: Message, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post(`/chat/message-send-seller-admin`, info, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_admin_message = createAsyncThunk(
    'chat/get_admin_message',
    async (receverId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/get-admin-messages/${receverId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_seller_message:any = createAsyncThunk(
    'chat/get_seller_message',
    async (receverId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/chat/get-seller-messages`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: ChatState = {
    successMessage: '',
    errorMessage: '',
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSellers: [],
    messageNotification: [],
    activeAdmin: '',
    friends: [],
    seller_admin_message: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: []
};

export const chatReducer = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
        updateMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Customer[]>) => {
            state.activeCustomer = action.payload;
        },
        updateSellers: (state, action: PayloadAction<Seller[]>) => {
            state.activeSellers = action.payload;
        },
        updateAdminMessage: (state, action: PayloadAction<Message>) => {
            state.seller_admin_message.push(action.payload);
        },
        updateSellerMessage: (state, action: PayloadAction<Message>) => {
            state.seller_admin_message.push(action.payload);
        },
        activeStatus_update: (state, action: PayloadAction<{ status: string }>) => {
            state.activeAdmin = action.payload.status;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(get_customers.fulfilled, (state, action) => {
            state.customers = action.payload.customers;
        });
        builder.addCase(get_customer_message.fulfilled, (state, action) => {
            state.messages = action.payload.messages;
            state.currentCustomer = action.payload.currentCustomer;
        });
        builder.addCase(send_message.fulfilled, (state, action) => {
            let index = state.customers.findIndex(f => f.fdId === action.payload.message.receverId);
            while (index > 0) {
                [state.customers[index], state.customers[index - 1]] = [state.customers[index - 1], state.customers[index]];
                index--;
            }
            state.messages.push(action.payload.message);
            state.successMessage = 'Message sent successfully';
        });
        builder.addCase(get_sellers.fulfilled, (state, action) => {
            state.sellers = action.payload.sellers;
        });
        builder.addCase(send_message_seller_admin.fulfilled, (state, action) => {
            state.seller_admin_message.push(action.payload.message);
            state.successMessage = 'Message sent successfully';
        });
        builder.addCase(get_admin_message.fulfilled, (state, action) => {
            state.seller_admin_message = action.payload.messages;
            state.currentSeller = action.payload.currentSeller;
        });
        builder.addCase(get_seller_message.fulfilled, (state, action) => {
            state.seller_admin_message = action.payload.messages;
        });
    }
});

export const { messageClear, updateMessage, updateCustomer, updateSellers, updateAdminMessage, updateSellerMessage, activeStatus_update } = chatReducer.actions;
export default chatReducer.reducer;