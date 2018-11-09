import React , {Component} from 'react';

import './Road.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import VW from '../../assets/img/vw.png'
import BMW from  '../../assets/img/bmw.png'

import RoadMap from '../RoadMap/RoadMap'
import connect from "react-redux/es/connect/connect";
import CancelMenu from "../CancelMenu/CancelMenu"
import {cancelOrder} from "../../fetch/fetch";
import clearDriverInfo from "../../actions/clearDriverInfo";
import clearOrderInfo from "../../actions/ordersActions/removeOrderAction";
import changeScreenAction from "../../actions/changeScreenAction";
import Order from "../Order/Order/Order";
import TimeMenu from '../TimeMenu/TimeMenu'
import menuPushAction from "../../actions/menuPushAction";

class Road extends Component{

    state = {
        time: 15,
        cancelOpen: false,
    };

    closeMenuCancel = (e) =>{
        this.setState({
            cancelOpen: false
        });
    };

    setTime = (value)=>{
        this.setState({
            time: value
        })
    };


    openMenuCancel = () => {
        this.setState({
            cancelOpen: true
        });
    };

    selectValue = (value)=>{
        cancelOrder(this.props.user.token,value).then(()=>{
            this.props.dispatch(changeScreenAction(<Order reset={true}/>));
        });
    };

    componentDidMount(){
        console.log(this.props.driver,'driver');
    }

    render(){
        console.log('endPOINT',this.props.order.startPoint.value);

        let car_image = (<img src={VW} alt=""/>);

            switch(this.props.driver.car.model) {
                case 'VW':
                    car_image = (<img src={VW} alt=""/>);
                    break;
                case 'BMW':
                    car_image = (<img src={BMW} alt=""/>);
                    break;
            }

        return(
            <React.Fragment>
                <CancelMenu closeMenu={this.closeMenuCancel} isOpen={this.state.cancelOpen} selectValue={this.selectValue}/>
                <TopBar/>
                <div class="red">
                    <RoadMap timeFunction={this.setTime}  lat={this.props.push.location.lat} lng={this.props.push.location.lon}   endPoint={this.props.order.startPoint.value}  startPoint={this.props.driver.location} />

                </div>
                <div class="way-info">
                    <div class="drive-wp">
                        <div class="driver">
                            <div class="driver-img">
                                {car_image}
                            </div>
                            <div class="driver-car">
                                <p>{this.props.driver.car.version}</p>
                                <div class="year-wp">
                                    <span class="year">{this.props.driver.car.year} г</span>
                                    <span class="color" style={{backgroundColor: this.props.driver.car.carHex}}>{this.props.driver.car.color}</span>
                                </div>

                                <div class="rating"><i class="fa fa-star" aria-hidden="true"></i>{this.props.driver.rating}</div>
                            </div>
                        </div>


                        <div class="time-wp">
                            <div class="time-img">
                                <img src={Time} alt=""/>
                            </div>
                            <div class="time">
                                <p>{Math.ceil(this.state.time)} минут</p>
                            </div>
                        </div>
                    </div>

                    <div class="second-line">

                    </div>
                    <div class="phone">
                                    <div class="probeg">
                                       
                                    </div>
                                    <a href={'tel:+' + this.props.driver.phone} class="phone-btn"><img src={Phone} alt=""/></a>
                                    <button class="cancel" onClick={this.openMenuCancel}>Отменить <i class="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                </div>
            </React.Fragment>
        )


    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        push: state.push,
        driver: state.driver
    };
};

export default connect(mapStateToProps)(Road);


/* lat={this.props.push.location.lat} lng={this.props.push.location.lon}*/
/* endPoint={this.props.order.startPoint.value} */
/*
 <RoadMap  lat={this.props.push.location.lat} lng={this.props.push.location.lon}   endPoint={this.props.order.startPoint.value}  startPoint={this.props.driver.location} />
 */