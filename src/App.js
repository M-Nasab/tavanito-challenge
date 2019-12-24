import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Provider} from 'react-redux'
import LoginPage from './pages/login/login';
import ProfilePage from './pages/profile/profile';
import AuthenticatedRoute from './components/authenticated-route/authenticated-route';
import UnauthenticatedRoute from './components/unauthenticated-route/unauthenticated-route';

function App({store}) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <UnauthenticatedRoute path="/login">
            <LoginPage></LoginPage>
          </UnauthenticatedRoute>

          <AuthenticatedRoute path="/profile">
            <ProfilePage></ProfilePage>
          </AuthenticatedRoute>

        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
