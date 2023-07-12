import { productConstants } from "../actions/constants"

const initstate = {
    product: [],
    productsByPrice: {
        under5k: [],
        under10k: [],
        under15k: [],
        under20k: [],
        under30k: [],
    },
    pageRequest: false,
    page: {},
    error: null
}

export default (state = initstate, action) => {
    switch (action.type) {
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;

        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest: true
            }
            break;

        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest: false
            }
            break;

        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                pageRequest: false,
                error: action.payload.error
            }
            break;
    }
    return state
}