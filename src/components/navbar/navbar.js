import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./navbar.scss";
import { logoutSuccess } from '../../actions/actions';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    logout(){
        this.props.logout();
    }
    
    render(){
        return (
            <nav className="navbar">
                <Button type="button" variant="contained" onClick={this.logout}>Logout</Button>
                <div className="navbar--mobile">{this.props.mobile}</div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    const mobile = state.authentication && state.authentication.user && state.authentication.user.mobile;
    console.log(state);
    return {
        mobile
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            return dispatch(logoutSuccess());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);