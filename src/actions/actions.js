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
          console.log(result);
          dispatch(requestSMSOTPSuccess());
          return result;
      })
      .catch(error => {
          console.log(error);
          dispatch(requestSMSOTPFail());
          throw error;
      });
  };
}