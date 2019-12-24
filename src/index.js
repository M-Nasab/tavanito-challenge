import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import * as serviceWorker from './serviceWorker';
import authAppReducer from './reducers/reducers';
import thunkMiddleware from 'redux-thunk'

// get initial application state
const applicationState = localStorage.getItem("applicationState");
const initialState = applicationState ? JSON.parse(applicationState) : undefined;

const store = createStore(authAppReducer, initialState, applyMiddleware(
    thunkMiddleware
));

// Persist application state
store.subscribe(() => {
    const state = store.getState();
    
    if(state){
        localStorage.setItem("applicationState", JSON.stringify(state));
    } else {
        localStorage.removeItem("applicationState");
    }
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
