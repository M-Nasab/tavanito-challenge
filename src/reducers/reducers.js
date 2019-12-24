import { combineReducers } from "redux";
import { LOGIN_SUCCESS, REQUEST_SMS_OTP, REQUEST_SMS_OTP_SUCCESS, REQUEST_SMS_OTP_FAIL, LOGOUT_SUCCESS } from "../actions/actions";

const defaultAuthState = {
    isLoggedIn: false,
    user: undefined
};

function authentication(state = defaultAuthState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                isLoggedIn: true,
                user: action.user
            };
        case LOGOUT_SUCCESS:
            return {
                isLoggedIn: false,
                user: undefined
            };
        default:
            return state;
    }
}

const authAppReducer = combineReducers({
    authentication
});

export default authAppReducer;