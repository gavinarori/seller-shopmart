import authReducer from './Reducers/authReducer';
import chatReducer from './Reducers/chatReducer'
import categoryReducer from './Reducers/categoryReducer'
import productReducer from './Reducers/productReducer'

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    chat: chatReducer,
}
export default rootReducer;