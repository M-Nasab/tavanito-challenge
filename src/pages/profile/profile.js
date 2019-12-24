import React, {Component} from 'react';
import "./profile.scss";
import { TextField, CircularProgress } from '@material-ui/core';
import {connect} from 'react-redux'
import { getUser } from '../../actions/actions';
import Button from '@material-ui/core/Button';

class ProfilePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: false,
            first_name: '',
            last_name: '',
            email: '',
            telephone: '',
            mobile: '',
            avatar: '',
            national_code: ''
        };
    }

    componentDidMount(){
        this.setState({ isLoading: true });
        this.props.getUser().then((userInfo) => {
            console.log(userInfo);
            const {
                first_name,
                last_name,
                email,
                telephone,
                mobile,
                avatar,
                national_code
            } = userInfo;

            this.setState({
                first_name,
                last_name,
                email,
                telephone,
                mobile,
                avatar,
                national_code
            });

        }).finally(() => {
            this.setState({ isLoading: false });
        });
    }

    fieldChange(fieldName, event){
        const value = event && event.target && event.target.value;
        this.setState({
            [fieldName]: value
        });
    }

    profileForm(){
        const avatarUrl = this.state.avatar && this.state.avatar["200x200-fit"];

        return (
            <form className="profile-form">
                <div className="profile-form--avatar">
                    <div className="avatar">
                        <img src={avatarUrl} alt="user avatar"></img>
                    </div>
                </div>
                <div className="form-field">
                    <TextField
                        id="first-name"
                        label="First Name"
                        variant="outlined"
                        value={this.state.first_name}
                        onChange={(event) => { this.fieldChange("first_name", event); }}
                        fullWidth
                    ></TextField>
                </div>

                <div className="form-field">
                    <TextField
                        id="last-name"
                        label="Last Name"
                        variant="outlined"
                        value={this.state.last_name}
                        onChange={(event) => { this.fieldChange("last_name", event); }}
                        fullWidth
                    ></TextField>
                </div>

                <div className="form-field">
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={this.state.email}
                        onChange={(event) => { this.fieldChange("email", event); }}
                        fullWidth
                    ></TextField>
                </div>

                <div className="form-field">
                    <TextField
                        id="telephone"
                        label="Telephone"
                        variant="outlined"
                        value={this.state.telephone}
                        onChange={(event) => { this.fieldChange("telephone", event); }}
                        fullWidth
                    ></TextField>
                </div>

                <div className="form-field">
                    <TextField
                        id="mobile"
                        label="Mobile"
                        variant="outlined"
                        value={this.state.mobile}
                        onChange={(event) => { this.fieldChange("mobile", event); }}
                        fullWidth
                    ></TextField>
                </div>

                <div className="form-field">
                    <TextField
                        id="national-code"
                        label="National Code"
                        variant="outlined"
                        value={this.state.national_code}
                        onChange={(event) => { this.fieldChange("national_code", event); }}
                        fullWidth
                    ></TextField>
                </div>
                <div className="actions-container">
                    <Button disabled={this.state.isLoggingIn} type="submit" variant="contained" color="primary">Save</Button>
                </div>
            </form>
        );
    }

    render(){
        return (
            <div className="profile-page">
                {
                    !this.state.isLoading ? this.profileForm() : 
                    <div className="spinner-container">
                        <CircularProgress></CircularProgress>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => {
            return dispatch(getUser());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);