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
import {getTradeList, getUserInfo} from './fetch/fetch'
import setUserInfoAction from "./actions/setUserInfoAction";
import setFavoritePoint from "./actions/setFavoritesPoints";
import setOrderAction from "./actions/setOrderAction";
import Driver from "./components/Driver/Driver";
import setDriverInfo from "./actions/setDriverInfoAction";
import locationPushAction from "./actions/locationPushAction";
import menuPushAction from "./actions/menuPushAction";
import Back from "./components/Back/Back";
import Price from "./components/Price/Price";
import Total from "./components/Total/Total";
import TopBar from "./components/TopBar/TopBar";
import Registration from "./components/Registration/Registration";
import OrderOptions from "./components/OrderOptions/OrderOptions";
import Races from "./components/Races/Races";
const store = createStore(taxiReducer,composeWithDevTools());






function getTheToken() {
    console.log('+++');
    window.FCMPlugin.getToken(
        function (token) {
            if (token == null) {
                setTimeout(getTheToken, 1000);
            } else {
                store.dispatch(setDeviceIdAction(token));

                if (store.getState().user.token === null){
                    console.log(store.getState());
                    store.dispatch(changeScreenAction(<Login />));
                }
                else{
                    getUserInfo(store.getState().user.token)
                        .then((data)=>{
                            store.dispatch(setUserInfoAction(data.user_info.info,store.getState().user.token));
                            store.dispatch(setFavoritePoint(data.user_info.favorites_points));
                            console.log(data,'data');


                            if (data.user_info.order!=null){

                                if(data.user_info.driver_info!=null){
                                    store.dispatch(setDriverInfo(data.user_info.driver_info));
                                }

                                store.dispatch(setOrderAction(data.user_info.order));

                                console.log(store.getState(),'store');

                                if (data.user_info.order.status === 1 || data.user_info.order.status === 2){
                                    console.log('search');
                                    store.dispatch(changeScreenAction(<Driver/>));
                                }

                                console.log(data.user_info.order.status === 3);
                                console.log(store.getState());
                                if ( data.user_info.order.status === 3 ||  data.user_info.order.status === 4){
                                    console.log(store.getState());
                                    store.dispatch(locationPushAction(data.user_info.driver_info.location));
                                    store.dispatch(changeScreenAction(<Road />));
                                }

                                if (data.user_info.order.status === 5){
                                    console.log(store.getState());
                                    store.dispatch(changeScreenAction(<Races />));
                                }
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
                            store.dispatch(changeScreenAction(<Login />));
                        });
                }
            }
        },
        function (err) {
            console.log('error retrieving token: ' + err);
        }
    );
}




document.addEventListener ("deviceready",() => {
    console.log('+++');
    setTimeout(getTheToken, 1000);
    window.FCMPlugin.onNotification((data) => {
        console.log('============PUSH============');
        console.log(JSON.stringify(data));
        console.log('============PUSH============');


        if (data.action === 'location'){
            console.log(data.lat,data.lon);
            store.dispatch(locationPushAction({
                lat: data.lat,
                lon: data.lon
            }));
        }

        if(data.action === 'send_time_to_driver'){
            console.log('ACTION:: send_time_to_driver');
            store.dispatch(menuPushAction(true));
        }

        if(data.action === 'start_ride'){
            console.log('ACTION:: start_ride');
            store.dispatch(changeScreenAction(<Races/>));
        }

        if(data.action === 'end_ride'){
            console.log('ACTION:: start_ride');
            store.dispatch(changeScreenAction(<Total />));
        }
    });
});




ReactDOM.render((
    <Provider store={store}>
        <App store={store} />
    </Provider>
), document.getElementById('root'));
