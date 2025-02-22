import authReducer from './Reducers/authReducer';
import chatReducer from './Reducers/chatReducer'
import categoryReducer from './Reducers/categoryReducer'
import productReducer from './Reducers/productReducer'
import dashboardIndexReducer from './Reducers/dashboardIndexReducer'

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    chat: chatReducer,
    dashboardIndex: dashboardIndexReducer,
}
export default rootReducer;