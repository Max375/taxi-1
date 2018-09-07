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
import EnterPin from "./components/EnterPin/EnterPin";
import {getUserInfo} from './fetch/fetch'
import setUserInfoAction from "./actions/setUserInfoAction";
import setFavoritePoint from "./actions/setFavoritesPoints";
import setOrderAction from "./actions/setOrderAction";
import SearchDriver from "./components/SearchDriver/SearchDriver";
const store = createStore(taxiReducer,composeWithDevTools());



/*

function getTheToken() {
    window.FCMPlugin.getToken(
        function (token) {
            if (token == null) {
                setTimeout(getTheToken, 1000);
            } else {
                store.dispatch(setDeviceIdAction(token));
                if (store.getState().user.token === null){
                    store.dispatch(changeScreenAction(<Login />));
                }
                else{
                    getUserInfo(store.getState().user.token)
                        .then((data)=>{
                            store.dispatch(setUserInfoAction(data.user_info.info,data.token));
                            store.dispatch(setFavoritePoint(data.user_info.favorites_points));
                            if (data.user_info.order!=null) store.dispatch(setOrderAction(data.user_info.order));
                            alert(data.user_info.order.status===1,typeof(data.user_info.order.status));
                            if (data.user_info.order.status === 1){
                                store.dispatch(changeScreenAction(<SearchDriver/>));
                            }
                            else{
                                store.dispatch(changeScreenAction(<Order/>));
                            }
                        })
                        .catch((e)=>{
                            e.then((data)=>{
                                JSON.stringify(data);
                            });
                            alert(JSON.stringify(e));
                        });
                }
            }
        },
        function (err) {
            console.log('error retrieving token: ' + err);
        }
    );
}

document.addEventListener ("deviceready",() => setTimeout(getTheToken, 1000));

*/

store.dispatch(changeScreenAction(<Order/>));

ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('root'));
