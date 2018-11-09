import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar.js';
import connect from "react-redux/es/connect/connect";
import './Races.css';
import Vw from '../../assets/img/vw.png'
import OrderInput from "../Order/OrderInput/OrderInput";
import VW from '../../assets/img/vw.png'
import BMW from  '../../assets/img/bmw.png'
import {getUserInfo} from "../../fetch/fetch";
import setUserInfoAction from "../../actions/setUserInfoAction";
import setFavoritePoint from "../../actions/setFavoritesPoints";
import setDriverInfo from "../../actions/setDriverInfoAction";
import setOrderAction from "../../actions/ordersActions/setOrderAction";
import changeScreenAction from "../../actions/changeScreenAction";
import Driver from "../Driver/DriverOffers/DriverOffers";
import locationPushAction from "../../actions/locationPushAction";
import Road from "../Road/Road";
import DriverWait from "../Driver/DriverWait";
import Order from "../Order/Order/Order";

class Races extends Component {



    componentDidMount(){
        getUserInfo(this.props.user.token)
            .then((data)=>{


                console.log(data,'data');
                this.props.dispatch(setUserInfoAction(data.user_info.info,this.props.user.token));
                this.props.dispatch(setFavoritePoint(data.user_info.favorites_points));


                if (data.user_info.order!=null){

                    if(data.user_info.driver_info!=null){
                        this.props.dispatch(setDriverInfo(data.user_info.driver_info));
                    }

                    this.props.dispatch(setOrderAction(data.user_info.order));
                }

            })
    }


    render(){
        console.log(this.props);

        let endPoints = [];
        for (let i = 0; i < this.props.order.endPoints.length; ++i){
            endPoints.push(
                <div class="races-point">
                    {this.props.order.endPoints[i].label}
                </div>
            )
        }


        let car_image = (<img src={VW} alt=""/>);

        switch(this.props.driver.car.model) {
            case 'VW':
                car_image = (<img src={VW} alt=""/>);
                break;
            case 'BMW':
                car_image = (<img src={BMW} alt=""/>);
                break;
        }

        return (

            <React.Fragment>
                <TopBar/>
               <div class="wrapper">
                   <div class="races-point">
                       {this.props.order.startPoint.label}
                   </div>

                   <div class="races-info">
                       <div class="races-person">
                           <img src={require("../../assets/img/face.png")} alt=""/>
                           <div class="vertical-person-data">
                               <div class="name">
                                   {this.props.user.name}
                               </div>
                               <div class="score">
                                   <i class="fa fa-star active" aria-hidden="true"></i>
                                   3.5
                               </div>
                           </div>
                       </div>
                   </div>


                   <div class="races-info">
                       <div class="races-person">
                           <div class="driver-img">
                               {car_image}
                           </div>
                           <div class="vertical-person-data">
                               <div class="driver-car">
                                   <p>{this.props.driver.car.version}</p>
                                   <div class="year-wp">
                                       <span class="year">{this.props.driver.car.year} г</span>
                                       <span class="color" style={{backgroundColor: this.props.driver.car.carHex}}>{this.props.driver.car.color}</span>
                                   </div>

                                   <div class="rating"><i class="fa fa-star" aria-hidden="true"></i>{this.props.driver.rating}</div>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="order-info">
                       <div class="price">
                           <div class="title">Цена</div>
                           {this.props.order.price} р
                       </div>
                       <div class="time">
                           <div class="title">Время поездки</div>
                           8 мин
                       </div>

                   </div>

                   <div class="pay-type">
                       <img width='30px' src={require("../../assets/img/icons/money.svg")} alt=""/> Оплата наличными
                   </div>

                   {endPoints}

               </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        driver: state.driver,
    };
};

export default connect(mapStateToProps)(Races);
