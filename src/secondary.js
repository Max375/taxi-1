import setDeviceIdAction from "./actions/setDeviceIdAction";
import changeScreenAction from "./actions/changeScreenAction";
import Login from "./components/Authorization/Login/Login";
import {getUserInfo, getTradeList} from "./fetch/fetch";
import clearTokenAction from "./actions/clearTokenAction";
import React from "react";
import {customConsole} from "./utils";
import {createStore} from "redux";
import taxiReducer from "./reducers/taxiReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import setUserInfoAction from "./actions/setUserInfoAction";
import setOrderAction from "./actions/ordersActions/setOrderAction";
import setDriverInfo from "./actions/setDriverInfoAction";
import setFavoritePoint from "./actions/setFavoritesPoints";
import setMinimalPrice from "./actions/setMinimalPriceAction";
import setCardListAction from "./actions/cardsActions/setCardListAction"
import Order from "./components/Order/Order/Order";
import SearchDriver from "./components/Driver/SearchDriver/SearchDriver";
import {logStoreState} from './utils';
import DriverOffers from "./components/Driver/DriverOffers/DriverOffers";
import setTradeAction from "./actions/tradesAction/setTradesAction"
import DriverWait from "./components/Driver/DriverWait/DriverWait";
import DriverRoad from "./components/Driver/DriverRoad/DriverRoad";
import Races from "./components/Ride/Races/Races";


export const store = createStore(taxiReducer,composeWithDevTools());

// This function get token and set start state
// Her need to start with timeout, because FCMPlugin have bug, token gave with timeout
export const getToken = ()=>{
    window.FCMPlugin.getToken(
        function (deviceId) {


            if (deviceId === null || deviceId === undefined) {
                setTimeout(getToken, 1000);
                return;
            }

            customConsole.log('deviceId was received, ', deviceId);

            store.dispatch(setDeviceIdAction(deviceId));


            if (store.getState().user.token === null || store.getState().user.token === undefined){
                customConsole.log('token is null', store.getState().user.token);
                store.dispatch(changeScreenAction(<Login />));
                return;
            }

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
        },
        function (err) {
            console.log('error retrieving token: ' + err);
        }
    );
};


export const setUserInfo = (data) => {
    customConsole.log('setUserInfo',JSON.stringify(data));
    store.dispatch(setUserInfoAction(data.user));
    store.dispatch(setOrderAction(data.order));
    store.dispatch(setDriverInfo(data.driver));
    store.dispatch(setFavoritePoint(data.favoritePoints));
    store.dispatch(setMinimalPrice(data.application.minimalPrice));
    store.dispatch(setCardListAction(data.cards))
};


export const doSync = () =>{
    const state = store.getState();
    const dispatch = store.dispatch;

    customConsole.log('doSync store state ', JSON.stringify(state));


    if (state.user.token === undefined){
        dispatch(changeScreenAction(<Login />));
        return;
    }

    if (state.order.status === null){
        dispatch(changeScreenAction(<Order />));
        return;
    }

    if(state.order.status === 1 || state.order.status === 2){
        console.log(state.trades.trades.length);
        if(state.trades.trades.length !== 0){
            dispatch(changeScreenAction(<DriverOffers />));
        }
        else{
            dispatch(changeScreenAction(<SearchDriver />));
        }
        return;
    }

    if(state.order.status === 3){
        dispatch(changeScreenAction(<DriverRoad />));
    }

    if(state.order.status === 4){
        dispatch(changeScreenAction(<DriverWait />));
    }

    if(state.order.status === 5){
        dispatch(changeScreenAction(<Races/>))
    }

};


export const updateTrades = () =>{
    getTradeList(store.getState().user.token, store.getState().app.deviceId)
        .then(data=>{
            store.dispatch(setTradeAction(data));
            logStoreState();
            doSync();
        })
        .catch(e => {
            customConsole.log(e);
        })
};


export  const setPushListener = ()=>{
    window.FCMPlugin.onNotification((data) => {

        customConsole.log('received push notification: ', JSON.stringify(data));


        if (data.action === 'get_trade_list'){
            updateTrades();
        }


        if (data.action === 'location'){
            console.log(data.lat,data.lon);
            /*
             store.dispatch(locationPushAction({
                 lat: data.lat,
                 lon: data.lon
             }));
             */
        }

        if(data.action === 'send_time_to_driver'){
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

        if(data.action === 'start_ride'){
            console.log('ACTION:: start_ride');
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

        if(data.action === 'end_ride'){
            /*


            console.log('ACTION:: end_ride');

            let info = JSON.parse(data.info);

            info.order_price = parseFloat(info.order_price);
            info.bonus = parseFloat(info.bonus);


            if (info.order_price<=info.bonus){
                info.bonus = info.order_price;
                info.order_price = 0;
            }
            else{
                info.order_price -=info.bonus;
            }

             */

        }
    });
};


