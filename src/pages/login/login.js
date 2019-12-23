import React, {Component} from 'react';
import "./login.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.phoneNumberChange = this.phoneNumberChange.bind(this);
        this.requestVerificationCode = this.requestVerificationCode.bind(this);

        this.state = {
            phoneNumber: ''
        };
    }

    requestVerificationCode(e){
        e.preventDefault();
    }

    phoneNumberChange(event){
        const phoneNumber = event.target.value;
        this.setState({ phoneNumber });
    }

    render(){
        return (
            <div className="login-page">
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
                    <Button type="submit" variant="contained" color="primary">Request Verification Code</Button>
                </form>
            </div>
        );
    }
}

export default LoginPage;