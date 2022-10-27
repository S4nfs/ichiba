import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
// import orderReducer from "./order.reducer";
// import productReducer from "./product.reducer";
import categoryReducer from "./category.reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    // order: orderReducer,
    // product: productReducer

})

export default rootReducer;