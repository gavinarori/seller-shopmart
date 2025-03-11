import authReducer from './Reducers/authReducer';
import chatReducer from './Reducers/chatReducer'
import categoryReducer from './Reducers/categoryReducer'
import productReducer from './Reducers/productReducer'
import dashboardIndexReducer from './Reducers/dashboardIndexReducer'
import sellerReducer from './Reducers/sellerReducer'

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    chat: chatReducer,
    dashboardIndex: dashboardIndexReducer,
    seller: sellerReducer,
}
export default rootReducer;