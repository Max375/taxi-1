import React , {Component} from 'react';

import './Driver.css';
import TopBar from "../../TopBar/TopBar";
import DriverOffer from '../../SearchDriver/DriverOffer/DriverOffer'
import connect from "react-redux/es/connect/connect";
import LoadImage from "../../../assets/img/load.gif";
import {cancelOrder, getTradeList} from "../../../fetch/fetch";
import changeScreenAction from "../../../actions/changeScreenAction";
import Order from "../../Order/Order/Order";
import BackBtn from "../../../assets/img/icons/button.svg";

class Driver extends Component{

    constructor(props) {
        super(props);
    }


    state = {
        tradeList: []
    };


    componentDidMount(){
        getTradeList(this.props.user.token,this.props.user.deviceId)
            .then(data => {

            });
    }

    updateData(value){
        this.setState({
            tradeList: this.state.tradeList.slice(this.state.tradeList.indexOf(value),1),
        });
        getTradeList(this.props.user.token,this.props.user.deviceId)
            .then(data=>{
                this.setState({
                    tradeList:data.trade_list
                });
            });
    }

    render(){
       let _Offers = [];

       for (let i=0; i < this.state.tradeList.length; i++){
           _Offers.push(<DriverOffer key={this.state.tradeList[i].id} token={this.props.user.token} data={this.state.tradeList[i]}  callback={this.updateData.bind(this)} dispatch={this.props.dispatch} />);
       }
        return(
            <React.Fragment>

                <TopBar/>
                <div class={'driver-wp'}>
                    {_Offers}
                </div>
            </React.Fragment>

        )


    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
    };
};

export default connect(mapStateToProps)(Driver);

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
                this.props.dispatch(changeScreenAction(<Driver/>));
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