import React , {Component} from 'react';

import './SearchDriver.css';
import TopBar from "../TopBar/TopBar";
import LoadImage from '../../assets/img/load.gif'
import BackBtn from '../../assets/img/icons/button.svg'
import changeScreenAction from "../../actions/changeScreenAction";
import Order from "../Order/Order";
import {getTradeList} from "../../fetch/fetch";
import Driver from "../Driver/Driver";


const GET_TRADE_LIST = 'get_trade_list';

function  SearchDriver(props){
        alert('START LISSEN');
         window.push_listener = window.FCMPlugin.onNotification(function(data) {
               if (data.action === GET_TRADE_LIST)
                getTradeList(props.token,props.deviceId).then((data) => {
                    console.log('================ getTradeList RESPONSE ===============');
                    console.log('body: ', JSON.stringify(data));
                    console.log('================ getTradeList RESPONSE ===============');
                    if (data != null){
                        props.dispatch(changeScreenAction(<Driver tradeList={data.trade_list}/>))
                    }
                });
             });


        return(
            <React.Fragment>

                    <div className="search">Поиск водителя</div>
                    <div className="load">
                        <img src={LoadImage} alt=""/>
                    </div>
                    <div className="back" onClick={() =>{ props.dispatch(changeScreenAction(<Order/>))}}>
                        <img src={BackBtn} alt=""/>
                    </div>


            </React.Fragment>
                )
}

export default SearchDriver;