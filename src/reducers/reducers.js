import { combineReducers } from "redux";
import { LOGIN_SUCCESS } from "../actions/actions";

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
        default:
            return state;
    }
}

const authAppReducer = combineReducers({
    authentication
});

export default authAppReducer;