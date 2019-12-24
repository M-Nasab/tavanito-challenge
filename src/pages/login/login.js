import React, {Component} from 'react';
import "./login.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { sendSMSOTP, loginWithOTP } from '../../actions/actions';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.phoneNumberChange = this.phoneNumberChange.bind(this);
        this.requestVerificationCode = this.requestVerificationCode.bind(this);
        this.loginWithOTP = this.loginWithOTP.bind(this);
        this.OTPCodeChange = this.OTPCodeChange.bind(this);
        this.requestOTPCodeAgain = this.requestOTPCodeAgain.bind(this);

        this.state = {
            phoneNumber: '',
            OTPCode: '',
            isGettingOTPCode: false,
            isOTPCodeSent: false,
            error: undefined,
            loginCodeError: undefined,
            loginMobileError: undefined,
            isLoggingIn: false
        };
    }

    requestVerificationCode(e){
        e.preventDefault();

        this.setState({ isGettingOTPCode: true, error: undefined });

        this.props.getOTPCode(this.state.phoneNumber).then((result) => {
            const OTPCodeMessage = result && result.message;
            console.log(OTPCodeMessage);

            this.setState({
                isOTPCodeSent: true
            })
        }).catch((error) => {
            const errorMessage = error && error.errors && error.errors.mobile && error.errors.mobile[0];
            this.setState({
                error: errorMessage
            });
        }).finally(() => {
            this.setState({ isGettingOTPCode: false });
        });
    }

    loginWithOTP(e){
        e.preventDefault();

        this.setState({ isLoggingIn: true, loginCodeError: undefined, loginMobileError: undefined });

        this.props.loginWithOTP(this.state.phoneNumber, this.state.OTPCode)
        .catch((error) => {
            const codeErrorMessage = error && error.errors && error.errors.code && error.errors.code[0];
            const mobileErrorMessage = error && error.errors && error.errors.mobile && error.errors.mobile[0];
            this.setState({
                loginCodeError: codeErrorMessage,
                loginMobileError: mobileErrorMessage
            });
        });
    }

    OTPCodeChange(event){
        const OTPCode = event.target.value;
        this.setState({ OTPCode, loginCodeError: undefined });
    }

    phoneNumberChange(event){
        const phoneNumber = event.target.value;
        this.setState({ phoneNumber, error: undefined, loginMobileError: undefined });
    }

    requestOTPCodeAgain(){
        this.setState({
            isOTPCodeSent: false,
            loginMobileError: undefined,
            loginCodeError: undefined
        });
    }

    OTPCodeForm(){
        return (
            <form className="login-form" onSubmit={this.requestVerificationCode}>
                <div className="form-field">
                    <TextField
                        id="phone-number"
                        label="Phone Number"
                        variant="outlined"
                        value={this.state.phoneNumber}
                        onChange={this.phoneNumberChange}
                    />
                </div>
                <div className="form-field">
                    <Button disabled={this.state.isGettingOTPCode} type="submit" variant="contained" color="primary">Request Verification Code</Button>
                </div>
                {
                    this.state.isGettingOTPCode ?
                    <div className="spinner-container">
                        <CircularProgress />
                    </div> : null
                }
                {
                    this.state.error ? (
                        <div className="form-field">
                            <div className="error">
                                { this.state.error }
                            </div>
                        </div>
                    ) : null
                }
            </form>
        );
    }

    loginWithOTPForm(){
        return (
            <form className="login-form" onSubmit={this.loginWithOTP}>
                <div className="form-field">
                    <TextField
                        id="phone-number"
                        label="Phone Number"
                        variant="outlined"
                        value={this.state.phoneNumber}
                        onChange={this.phoneNumberChange}
                    />
                </div>

                <div className="form-field">
                    <TextField
                        id="otp-code"
                        label="OTP Code"
                        variant="outlined"
                        value={this.state.OTPCode}
                        onChange={this.OTPCodeChange}
                    />
                </div>
                <div className="form-field">
                    <Button disabled={this.state.isLoggingIn} type="submit" variant="contained" color="primary">Login</Button>
                </div>
                {
                    this.state.isLoggingIn ?
                    <div className="spinner-container">
                        <CircularProgress />
                    </div> : null
                }
                <div className="form-field">
                    <Button type="button" variant="contained" color="secondary" onClick={this.requestOTPCodeAgain}>Didn't get the code? try again</Button>
                </div>

                {
                    this.state.loginCodeError ? (
                        <div className="form-field">
                            <div className="error">
                                { this.state.loginCodeError }
                            </div>
                        </div>
                    ) : null
                }

                {
                    this.state.loginMobileError ? (
                        <div className="form-field">
                            <div className="error">
                                { this.state.loginMobileError }
                            </div>
                        </div>
                    ) : null
                }
            </form>
        );
    }

    render(){
        return (
            <div className="login-page">
                { !this.state.isOTPCodeSent ? this.OTPCodeForm() : this.loginWithOTPForm() }   
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOTPCode: (mobile) => {
            return dispatch(sendSMSOTP(mobile)); 
        },
        loginWithOTP: (mobile, code) => {
            return dispatch(loginWithOTP(mobile, code));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);