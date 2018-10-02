import React , {Component} from 'react';

import './Road.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import Vw from '../../assets/img/vw.png'
import RoadMap from '../RoadMap/RoadMap'
import connect from "react-redux/es/connect/connect";
import CancelMenu from "../CancelMenu/CancelMenu"
import {cancelOrder} from "../../fetch/fetch";
import clearDriverInfo from "../../actions/clearDriverInfo";
import clearOrderInfo from "../../actions/clearOrderInfo";
import changeScreenAction from "../../actions/changeScreenAction";
import Order from "../Order/Order";
import TimeMenu from '../TimeMenu/TimeMenu'
import menuPushAction from "../../actions/menuPushAction";

class Road extends Component{

    state = {
        time: 0,
        cancelOpen: false,
    };

    closeMenuCancel = (e) =>{
        this.setState({
            cancelOpen: false
        });
    };

    closeTimeMenu = () =>{
        this.props.dispatch(menuPushAction(false));
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
        return(
            <React.Fragment>
                <TimeMenu isOpen={this.props.push.menu} closeMenu={this.closeTimeMenu} />
                <CancelMenu closeMenu={this.closeMenuCancel} isOpen={this.state.cancelOpen} selectValue={this.selectValue}/>
                <TopBar/>
                <div className="red">
                    <RoadMap  lat={this.props.push.location.lat} lng={this.props.push.location.lon}   endPoint={this.props.order.startPoint.value}  startPoint={this.props.driver.location} />

                </div>
                <div className="way-info">
                    <div className="drive-wp">
                        <div className="driver">
                            <div className="driver-img">
                                <img src={Vw} alt=""/>
                            </div>
                            <div className="driver-car">
                                <p>{this.props.driver.car.version}</p>
                                <div className="year-wp">
                                    <span className="year">{this.props.driver.car.year} г</span>
                                    <span className="color">{this.props.driver.car.color}</span>
                                </div>

                                <div className="rating"><i className="fa fa-star" aria-hidden="true"></i>{this.props.driver.rating}</div>
                            </div>
                        </div>


                        <div className="time-wp">
                            <div className="time-img">
                                <img src={Time} alt=""/>
                            </div>
                            <div className="time">
                                <p>8 минут</p>
                            </div>
                        </div>
                    </div>

                    <div className="second-line">

                    </div>
                    <div className="phone">
                                    <div className="probeg">
                                        Пробег <br/>7км
                                    </div>
                                    <a href={'tel:+' + this.props.driver.phone} className="phone-btn"><img src={Phone} alt=""/></a>
                                    <button className="cancel" onClick={this.openMenuCancel}>Отменить <i className="fa fa-times" aria-hidden="true"></i></button>
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