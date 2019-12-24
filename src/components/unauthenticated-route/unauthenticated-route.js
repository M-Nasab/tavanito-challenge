import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux'

class UnauthenticatedRoute extends Component {

    render(){
        const {children, ...rest} = this.props;
        const isLoggedIn = this.props.isLoggedIn;

        return (
            <Route
                {...rest}
                render={
                    ({ location }) =>
                    !isLoggedIn ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/profile",
                                state: { from: location }
                            }}
                        />
                    )
                }
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.isLoggedIn
    };
}

export default connect(mapStateToProps)(UnauthenticatedRoute);