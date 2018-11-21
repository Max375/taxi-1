import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import {getToken, store, setPushListener, setUserInfo, doSync} from './secondary';
import setDeviceIdAction from "./actions/setDeviceIdAction";
import changeScreenAction from "./actions/changeScreenAction";
import Login from "./components/Authorization/Login/Login";
import {customConsole} from "./utils";
import {getUserInfo} from "./fetch/fetch";
import clearTokenAction from "./actions/clearTokenAction";

/*

document.addEventListener ("deviceready",() => {
    setTimeout(getToken, 1000);
    setPushListener();
});
 */

const deviceId ='123';

customConsole.log('deviceId was received, ', deviceId);

store.dispatch(setDeviceIdAction(deviceId));


if (store.getState().user.token === null || store.getState().user.token === undefined){
    customConsole.log('token is null', store.getState().user.token);
    store.dispatch(changeScreenAction(<Login />));
}
else{
    customConsole.log('token is\'t null', store.getState().user.token);



    getUserInfo(store.getState().user.token)
        .then(data => {
            setUserInfo(data);
            doSync();
            console.log(store.getState());
        })
        .catch(err => {
            customConsole.error(err);
            store.dispatch(changeScreenAction(<Login />));
            store.dispatch(clearTokenAction());
        });
}



ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('root'));
