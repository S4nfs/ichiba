import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import pageReducer from "./page.reducer";
// import orderReducer from "./order.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    // order: orderReducer,

})

export default rootReducer;