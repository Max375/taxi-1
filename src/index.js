import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import taxiReducer from './reducers/taxiReducer';
import { Provider } from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension";

import {createStore} from 'redux'
import setDeviceIdAction from "./actions/setDeviceIdAction";
import changeScreenAction from "./actions/changeScreenAction";
import Login from "./components/Login/Login";
import Order from "./components/Order/Order";
import Road from "./components/Road/Road";

const store = createStore(taxiReducer,composeWithDevTools());


/*
function getTheToken() {
    window.FCMPlugin.getToken(
        function (token) {
            if (token == null) {
                console.log("null token");
                setTimeout(getTheToken, 1000);
            } else {
                console.log("I got the token: " + token);
                store.dispatch(setDeviceIdAction(token));
                document.getElementById('test').value = token;
                if (store.getState().user.token === null) store.dispatch(changeScreenAction(<Road />));
                else store.dispatch(changeScreenAction(<Road />));
            }
        },
        function (err) {
            console.log('error retrieving token: ' + err);
        }
    );
}
 */


store.dispatch(changeScreenAction(<Road />));
//document.addEventListener ("deviceready",() => setTimeout(getTheToken, 1000));



ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('root'));
