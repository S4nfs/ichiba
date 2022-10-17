import { authConstants } from "../actions/constants"

const initstate = {
    name: "sagar"
}
export default (state = initstate, action) => {
    console.log(action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                ...action.payload
            }
            break;

    }
    return state
}