    import React , {Component} from 'react';

import './Driver.css';
import TopBar from "../TopBar/TopBar";
import DriverOffer from '../DriverOffer/DriverOffer'
import connect from "react-redux/es/connect/connect";
import LoadImage from "../../assets/img/load.gif";
import {cancelOrder, getTradeList} from "../../fetch/fetch";
import changeScreenAction from "../../actions/changeScreenAction";
import Order from "../Order/Order";
import BackBtn from "../../assets/img/icons/button.svg";
import locationPushAction from  "../../actions/locationPushAction";
import menuPushAction from "../../actions/menuPushAction"
import Races from "../Races/Races";
import Total from "../Total/Total";
    import DriverWait from "../DriverWait/DriverWait";

class Driver extends Component{
    constructor(props) {
        super(props);
        console.log(JSON.stringify(props));
    }


    state = {
        tradeList: []
    };


    componentDidMount(){
        getTradeList(this.props.user.token,this.props.user.deviceId)
            .then(data=>{
                this.setState({
                    tradeList:data.trade_list
                });
            });
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
                this.props.dispatch(changeScreenAction(<DriverWait/>));
            }

            if(data.action === 'start_ride'){
                console.log('ACTION:: start_ride');
                this.props.dispatch(changeScreenAction(<Races/>));
            }

            if(data.action === 'end_ride'){
                console.log('ACTION:: start_ride');
                this.props.dispatch(changeScreenAction(<Total />));
            }

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
                <div className={this.state.tradeList.length === 0 ? "search-driver" : "search-driver search-driver--close"}>
                    <div className="search">Поиск водителя</div>
                    <div className="load">
                        <img src={LoadImage} alt=""/>
                    </div>
                    <div className="back" onClick={() =>{
                        cancelOrder(this.props.user.token,'Водитель не найден').then((res)=>{
                            if (res === true) this.props.dispatch(changeScreenAction(<Order/>));
                            else {
                                console.log('CANCELED ORDER FETCH FAILED');
                            }
                        });
                    }}>
                        <img src={BackBtn} alt=""/>
                    </div>


                </div>

                <TopBar/>
                <div className={'driver-wp'}>
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

