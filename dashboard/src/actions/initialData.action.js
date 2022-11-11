import { categoryConstants, productConstants } from "./constants"
import axios from "../helpers/axios"

export const getinitialData = () => {
    return async dispatch => {
        const res = await axios.post('/initialdata');
        if (res.status === 200) {
            const { categories, products } = res.data
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
        }
    }
}
