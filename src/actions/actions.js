export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function loginSuccess(user){
    return {
        type: LOGIN_SUCCESS,
        user
    };
};