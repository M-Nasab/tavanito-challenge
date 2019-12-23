import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Provider} from 'react-redux'
import LoginPage from './pages/login/login';
import ProfilePage from './pages/profile/profile';

function App({store}) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/profile">
            <ProfilePage></ProfilePage>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
