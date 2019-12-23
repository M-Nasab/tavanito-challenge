import React, {Component} from 'react';
import "./login.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import { sendSMSOTP } from '../../actions/actions';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.phoneNumberChange = this.phoneNumberChange.bind(this);
        this.requestVerificationCode = this.requestVerificationCode.bind(this);

        this.state = {
            phoneNumber: '',
            isGettingOTPCode: false
        };
    }

    requestVerificationCode(e){
        e.preventDefault();

        this.setState({ isGettingOTPCode: true });

        this.props.getOTPCode(this.state.phoneNumber).then((result) => {    
        }).catch((error) => {
        }).finally(() => {
            this.setState({ isGettingOTPCode: false });
        });
    }

    phoneNumberChange(event){
        const phoneNumber = event.target.value;
        this.setState({ phoneNumber });
    }

    render(){
        return (
            <div className="login-page">
                <form className="login-form" onSubmit={this.requestVerificationCode}>
                    { this.state.isGettingOTPCode ? "is getting otp code ..." : null }
                    <div className="form-field">
                        <TextField
                            id="phone-number"
                            label="Phone Number"
                            variant="outlined"
                            value={this.state.phoneNumber}
                            onChange={this.phoneNumberChange}
                        />
                    </div>
                    <Button type="submit" variant="contained" color="primary">Request Verification Code</Button>
                </form>
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);