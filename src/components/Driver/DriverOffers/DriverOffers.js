import React , {Component} from 'react';

import './DriverOffers.css';
import TopBar from "../../TopBar/TopBar";
import Offer from '../Offer/Offer'
import connect from "react-redux/es/connect/connect";
import {cancelTrade, acceptTrade} from "../../../fetch/fetch";
import {customConsole} from "../../../utils";
import {updateTrades} from "../../../secondary";

class DriverOffers extends Component{

    constructor(props) {
        super(props);
    }




    cancelTradeHandler = (function (token) {
        const _token = token;

        return (orderId, driverId)=>{
            cancelTrade(orderId, driverId, _token)
                .then(()=>{
                    updateTrades();
                })
                .catch(err =>{
                    updateTrades();
                    customConsole(err);
                })
        }
    }(this.props.user.token));

    acceptTradeHandler = (function(token){
        const _token = token;

        return (orderId, driverId)=>{
            acceptTrade(orderId, driverId, _token)
                .then(()=>{
                    updateTrades();
                })
                .catch(err =>{
                    updateTrades();
                    customConsole(err);
                })
        }
    }(this.props.user.token));



    render(){
       let offers = [];

       this.props.trades.forEach(el=>{
           offers.push(<Offer key={el.id} offer={el} cancelTrade={this.cancelTradeHandler} acceptTrade={this.acceptTradeHandler}/>);
       });

        return(
            <React.Fragment>
                <TopBar/>
                <div className={'driver-wp'}>
                    {offers}
                </div>
            </React.Fragment>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        trades: state.trades.trades
    };
};

export default connect(mapStateToProps)(DriverOffers);

/*

window.FCMPlugin.onNotification((data) => {
            console.log('============PUSH============');
            console.log(data);
            console.log('============PUSH============');

            if (data.action === 'get_trade_list'){
                try{
                    getTradeList(this.props.user.token,this.props.user.deviceId)
                        .then(data=>{
                            this.setState({
                                tradeList:data.trade_list
                            });
                        })
                }
                catch (e) {
                    console.error(e);
                }
            }

            if (data.action === 'location'){
                console.log(data.lat,data.lon);
                this.props.dispatch(locationPushAction({
                    lat: data.lat,
                    lon: data.lon
                }));
            }

            if(data.action === 'send_time_to_driver'){
                console.log('ACTION:: send_time_to_driver');
                this.props.dispatch(changeScreenAction(<DriverOffers/>));
            }

            if(data.action === 'start_ride'){
                console.log('ACTION:: start_ride');
                this.props.dispatch(changeScreenAction(<Races/>));
            }

            if(data.action === 'end_ride'){
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

                console.log(info);

                this.props.dispatch(changeScreenAction(<Total data={info} />));
            }

        });

 */