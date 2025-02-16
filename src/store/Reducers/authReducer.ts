

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import api from '@/app/api/api';

interface AuthState {
    successMessage: string;
    errorMessage: string;
    loader: boolean;
    userInfo: any;
    role: string;
    token: string | null;
}

interface LoginInfo {
    email: string;
    password: string;
}

interface RegisterInfo extends LoginInfo {
    name: string;
}

interface LogoutInfo {
    navigate: (path: string) => void;
    role: string;
}

interface ApiResponse {
    message: string;
    token: string;
    userInfo?: any;
}

export const admin_login = createAsyncThunk<ApiResponse, LoginInfo>(
    'auth/admin_login',
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await api.post<ApiResponse>('/admin-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const seller_login = createAsyncThunk<ApiResponse, LoginInfo>(
    'auth/seller_login',
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await api.post<ApiResponse>('/seller-login', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logout = createAsyncThunk<void, LogoutInfo>(
    'auth/logout',
    async ({ navigate, role }, { rejectWithValue }) => {
        try {
            await api.get('/logout', { withCredentials: true });
            localStorage.removeItem('accessToken');
            navigate(role === 'admin' ? '/admin/login' : '/login');
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const seller_register = createAsyncThunk<ApiResponse, RegisterInfo>(
    'auth/seller_register',
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await api.post<ApiResponse>('/seller-register', info, { withCredentials: true });
            localStorage.setItem('accessToken', data.token);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_user_info = createAsyncThunk<ApiResponse>(
    'auth/get_user_info',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get<ApiResponse>('/get-user', { withCredentials: true });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const returnRole = (token: string | null): string => {

    if (typeof window === "undefined") return ""; 

    if (token) {
        const decodedToken: any = jwtDecode(token);
        const expireTime = new Date(decodedToken.exp * 1000);
        if (new Date() > expireTime) {
            localStorage.removeItem('accessToken');
            return '';
        }
        return decodedToken.role;
    }
    return '';
};

const initialState: AuthState = {
    successMessage: '',
    errorMessage: '',
    loader: false,
    userInfo: null,
    role: typeof window !== "undefined" ? returnRole(localStorage.getItem("accessToken")) : "",
    token: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
};


export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(admin_login.pending, (state) => { state.loader = true; })
            .addCase(admin_login.rejected, (state, { payload }: PayloadAction<any>) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(admin_login.fulfilled, (state, { payload }: PayloadAction<ApiResponse>) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
            .addCase(seller_login.pending, (state) => { state.loader = true; })
            .addCase(seller_login.rejected, (state, { payload }: PayloadAction<any>) => {
                state.loader = false;
                state.errorMessage = payload.error;
            })
            .addCase(seller_login.fulfilled, (state, { payload }: PayloadAction<ApiResponse>) => {
                state.loader = false;
                state.successMessage = payload.message;
                state.token = payload.token;
                state.role = returnRole(payload.token);
            })
            .addCase(get_user_info.fulfilled, (state, { payload }: PayloadAction<ApiResponse>) => {
                state.loader = false;
                state.userInfo = payload.userInfo;
                state.role = payload.userInfo?.role;
            });
    }
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;