import React , {Component} from 'react';

import './DriverWait.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import Vw from '../../assets/img/vw.png'
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
import VW from '../../assets/img/vw.png'
import BMW from  '../../assets/img/bmw.png'

class DriverWait extends Component{

    state = {
        time: 0,
        cancelOpen: false,
    };


    closeTimeMenu = () =>{
        this.props.dispatch(menuPushAction(false));
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
                <TimeMenu token={this.props.user.token} isOpen={this.props.push.menu} closeMenu={this.closeTimeMenu} />
                <TopBar/>
                <div class="way-info">
                    <div class="search">Вас ожидает</div>
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

                    </div>

                    <div class="red">
                        <button onClick={()=>{
                            this.props.dispatch(menuPushAction(true));
                        }}>Через сколько вы будете ?</button>
                    </div>

                    <div class="second-line">

                    </div>
                    <div class="phone wait-phone">

                                    <a href={'tel:+' + this.props.driver.phone} class="phone-btn"><img src={Phone} alt=""/></a>
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

export default connect(mapStateToProps)(DriverWait);


/* lat={this.props.push.location.lat} lng={this.props.push.location.lon}*/
/* endPoint={this.props.order.startPoint.value} */
/*
 <RoadMap  lat={this.props.push.location.lat} lng={this.props.push.location.lon}   endPoint={this.props.order.startPoint.value}  startPoint={this.props.driver.location} />
 */