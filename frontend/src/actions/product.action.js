
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
        dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST })
        let res;
        try {
            const { cid, type } = payload.searchParams;
            res = await axios.get(`/page/${cid}/${type}`);
            console.log(cid, type)
            const { page } = res.data
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                payload: { page }
            })

        } catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                payload: { error: res.data.error }
            })
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST })
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            })

        } catch (error) {
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            })
        }

    }
}