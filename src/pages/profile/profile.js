import React, {Component} from 'react';
import "./profile.scss";
import { TextField, CircularProgress } from '@material-ui/core';
import {connect} from 'react-redux'
import { getUser, updateUser } from '../../actions/actions';
import Button from '@material-ui/core/Button';

class ProfilePage extends Component {
    constructor(props){
        super(props);

        this.saveProfile = this.saveProfile.bind(this);

        this.state = {
            isLoading: false,
            isUpdating: false,
            updated: false,
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
            [fieldName]: value,
            updated: false,
            error: false
        });
    }

    saveProfile(event){
        event.preventDefault();

        const {
            first_name,
            last_name,
            email,
            national_code,
            telephone,
            mobile
        } = this.state;

        const user = {
            first_name,
            last_name,
            email,
            national_code,
            telephone,
            mobile
        };

        this.setState({ isUpdating: true });
        this.props.updateUser(user).then(() => {
            this.setState({ updated: true });
        }).catch((error) => {
            console.log(error);
            const errorMessage = error && error.errors;
            this.setState({ error: errorMessage });
        })
        .finally(() => {
            this.setState({ isUpdating: false });
        });
    }

    profileForm(){
        const avatarUrl = this.state.avatar && this.state.avatar["200x200-fit"];

        return (
            <form className="profile-form" onSubmit={this.saveProfile}>
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
                {
                    this.state.updated ? (
                        <div className="form-field">
                            <div className="success">
                                پروفایل کاربری شما با موفقیت ذخیره شد
                            </div>
                        </div>
                    ) : null
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

                {
                    this.state.isUpdating ? (
                        <div className="spinner-container">
                            <CircularProgress></CircularProgress>
                        </div>
                    ) : null
                }
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
        },
        updateUser: (user) => {
            return dispatch(updateUser(user))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);