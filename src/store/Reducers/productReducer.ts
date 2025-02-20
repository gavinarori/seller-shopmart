import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/app/api/api';

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

interface ProductState {
    successMessage: string;
    errorMessage: string;
    loader: boolean;
    products: Product[];
    product: Product | null;
    totalProduct: number;
}

interface ImageUpdatePayload {
    oldImage: File;
    newImage: File;
    productId: string;
}

interface get_productsParams {
    parPage: number;
    page: number;
    searchValue: string;
}

export const add_product = createAsyncThunk(
    'product/add_product',
    async (product: Partial<Product>, {  rejectWithValue, fulfillWithValue  }) => {
        try {
            const { data } = await api.post('/product-add', product, { withCredentials: true });
            return fulfillWithValue(data)
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const  update_product = createAsyncThunk(
    'product/update_product',
    async (product: Partial<Product>, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/product-update', product, { withCredentials: true });
            return fulfillWithValue(data)
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const delete_product = createAsyncThunk(
    'product/delete_product',
    async (productId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.delete(`/product-delete/${productId}`, { withCredentials: true });
            return fulfillWithValue({ productId, ...data });
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const product_image_update = createAsyncThunk(
    'product/product_image_update',
    async ({ oldImage, newImage, productId }: ImageUpdatePayload, { rejectWithValue, fulfillWithValue}) => {
        try {
            const formData = new FormData();
            formData.append('oldImage', oldImage);
            formData.append('newImage', newImage);
            formData.append('productId', productId);
            const { data } = await api.post('/product-image-update', formData, { withCredentials: true });
            return fulfillWithValue(data)
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_products = createAsyncThunk(
    'product/get_products',
    async ({ parPage, page, searchValue }: get_productsParams, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`, { withCredentials: true });
            return fulfillWithValue(data)
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const get_product = createAsyncThunk(
    'product/get_product',
    async (productId: string, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.get(`/product-get/${productId}`, { withCredentials: true });
            return fulfillWithValue(data);
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: ProductState = {
    successMessage: '',
    errorMessage: '',
    loader: false,
    products: [],
    product: null,
    totalProduct: 0,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_product.pending, (state) => {
                state.loader = true;
            })
            .addCase(add_product.rejected, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.errorMessage = action.payload?.error || 'Failed to add product';
            })
            .addCase(add_product.fulfilled, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.successMessage = action.payload.message;
            })
            .addCase(get_products.fulfilled, (state, action: PayloadAction<any>) => {
                state.totalProduct = action.payload.totalProduct;
                state.products = action.payload.products;
            })
            .addCase(get_product.fulfilled, (state, action: PayloadAction<any>) => {
                state.product = action.payload.product;
            })
            .addCase(update_product.pending, (state) => {
                state.loader = true;
            })
            .addCase(update_product.rejected, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.errorMessage = action.payload?.error || 'Failed to update product';
            })
            .addCase(update_product.fulfilled, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.product = action.payload.product;
                state.successMessage = action.payload.message;
            })
            .addCase(product_image_update.fulfilled, (state, action: PayloadAction<any>) => {
                state.product = action.payload.product;
                state.successMessage = action.payload.message;
            })
            .addCase(delete_product.pending, (state) => {
                state.loader = true;
            })
            .addCase(delete_product.rejected, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.errorMessage = action.payload?.error || 'Failed to delete product';
            })
            .addCase(delete_product.fulfilled, (state, action: PayloadAction<any>) => {
                state.loader = false;
                state.successMessage = action.payload.message;
                state.products = state.products.filter((product) => product._id !== action.payload.productId);
            });
    },
});

export const { clearMessage } = productSlice.actions;
export default productSlice.reducer;
