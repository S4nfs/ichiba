
import axios from "../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        if (res.status == 200) {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            })
        } else {

        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.searchParams;
            const res = await axios.get(`/page/${cid}/${type}`);
            console.log(cid, type)
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST })
            if (res.status == 200) {
                const { page } = res.data
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                })
            } else {
                const { error } = res.data
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    error: { error }
                })
            }
        } catch (error) {
        }

    }
}