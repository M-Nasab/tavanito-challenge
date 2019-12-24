import ApplicationApi from "../api/api";

const api = new ApplicationApi();

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function loginSuccess(user){
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

export const REQUEST_SMS_OTP = "REQUEST_SMS_OTP";

export function requestSMSOTP(){
    return {
        type: REQUEST_SMS_OTP
    };
};

export const REQUEST_SMS_OTP_SUCCESS = "REQUEST_SMS_OTP_SUCCESS";

export function requestSMSOTPSuccess(){
    return {
        type: REQUEST_SMS_OTP_SUCCESS
    };
};

export const REQUEST_SMS_OTP_FAIL = "REQUEST_SMS_OTP_FAIL";

export function requestSMSOTPFail(){
    return {
        type: REQUEST_SMS_OTP_FAIL
    };
};

export function sendSMSOTP(phoneNumber) {
  return function(dispatch) {
    dispatch(requestSMSOTP());

    return api
      .getOTPCode(phoneNumber)
      .then(result => {
          dispatch(requestSMSOTPSuccess());
          return result;
      })
      .catch(error => {
          dispatch(requestSMSOTPFail());
          throw error;
      });
  };
};

export const REQUEST_LOGIN_WITH_OTP = "REQUEST_LOGIN_WITH_OTP";

export function requestLoginWithOTP(){
    return {
        type: REQUEST_LOGIN_WITH_OTP
    };
}

export const REQUEST_LOGIN_WITH_OTP_FAIL = "REQUEST_LOGIN_WITH_OTP_FAIL";

export function requestLoginWithOTPFail(){
    return {
        type: REQUEST_LOGIN_WITH_OTP_FAIL
    };
}

export function loginWithOTP(mobile, code) {
    return function(dispatch) {
        dispatch(requestLoginWithOTP());

        return api.loginWithOTP(mobile, code).then((user) => {
            dispatch(loginSuccess(user));
            return user;
        })
        .catch((error) => {
            dispatch(requestLoginWithOTPFail());
            throw error;
        });
    };
}

export const GET_USER_START = "GET_USER_START";

export function getUserStart(){
    return {
        type: GET_USER_START
    };
};

export const GET_USER_FAILURE = "GET_USER_FAILURE";

export function getUserFailure(){
    return {
        type: GET_USER_FAILURE
    };
};

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export function getUserSuccess(userInfo){
    return {
        type: GET_USER_SUCCESS,
        userInfo
    };
}

export function getUser(){
    return function(dispatch){
        dispatch(getUserStart());

        return api.getUserInfo().then((userInfo) => {
            dispatch(getUserSuccess(userInfo.data));
            return userInfo.data;
        })
        .catch((error) => {
            dispatch(getUserFailure());
            throw error;
        });
    };
}

export const UPDATE_USER_START = "UPDATE_USER_START";

export function updateUserStart(){
    return {
        type: GET_USER_START
    };
};

export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export function updateUserFailure(){
    return {
        type: GET_USER_FAILURE
    };
};

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export function updateUserSuccess(userInfo){
    return {
        type: GET_USER_SUCCESS,
        userInfo
    };
}

export function updateUser(user){
    return function(dispatch){
        dispatch(updateUserStart());

        return api.updateUserInfo(user).then(() => {
            dispatch(updateUserSuccess());
        })
        .catch((error) => {
            dispatch(updateUserFailure());
            throw error;
        });
    };
}