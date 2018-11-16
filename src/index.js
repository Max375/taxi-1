import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import {getToken, store, setPushListener} from './secondary';
import setDeviceIdAction from "./actions/setDeviceIdAction";
import changeScreenAction from "./actions/changeScreenAction";
import Login from "./components/Order/Order/Order";

/*

document.addEventListener ("deviceready",() => {
    setTimeout(getToken, 1000);
    setPushListener();
});
 */

store.dispatch(setDeviceIdAction('123'));
store.dispatch(changeScreenAction(<Login />));





ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('root'));
