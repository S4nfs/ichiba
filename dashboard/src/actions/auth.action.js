import { authConstants } from "./constants"

export const login = (user) => {
    return async (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST,
            payload: {
                ...user
            }
        })
    }
}