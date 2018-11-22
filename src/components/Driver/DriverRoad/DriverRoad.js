import React , {Component} from 'react';

import './DriverRoad.css';
import TopBar from "../../TopBar/TopBar";
import RoadMap from '../RoadMap/RoadMap'
import connect from "react-redux/es/connect/connect";
import CancelOrderMenu from "../CancelOrderMenu/CancelOrderMenu"
import {cancelOrder} from "../../../fetch/fetch";
import changeScreenAction from "../../../actions/changeScreenAction";
import {carModelCheck} from "../../../utils";


class DriverRoad extends Component{

    state = {
        time: 15,
        cancelOpen: false,
    };

    closeMenuCancel = () =>{
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
        //// CANCEL ORDER TODO
    };


    render(){

        return(
            <React.Fragment>
                <CancelOrderMenu closeMenu={this.closeMenuCancel} isOpen={this.state.cancelOpen} selectValue={this.selectValue}/>

                <TopBar/>
                <div className="red">
                    <RoadMap timeFunction={this.setTime}  lat={this.props.push.location.lat} lng={this.props.push.location.lon}   endPoint={this.props.order.startPoint.value}  startPoint={this.props.driver.location} />
                </div>
                <div className="way-info">
                    <div className="drive-wp">
                        <div className="driver">
                            <div className="driver-img">
                                {carModelCheck(this.props.driver.car.model)}
                            </div>
                            <div className="driver-car">
                                <p>{this.props.driver.car.version}</p>
                                <div className="year-wp">
                                    <span className="year">{this.props.driver.car.year} г</span>
                                    <span className="color" style={{backgroundColor: this.props.driver.car.colorCode}}>{this.props.driver.car.color}</span>
                                </div>

                                <div className="rating"><i className="fa fa-star" aria-hidden="true"></i>{this.props.driver.rating}</div>
                            </div>
                        </div>


                        <div className="time-wp">
                            <div className="time-img">
                                <img alt=""/>
                            </div>
                            <div className="time">
                                <p>{Math.ceil(this.state.time)} минут</p>
                            </div>
                        </div>
                    </div>

                    <div className="second-line">

                    </div>
                    <div className="phone">
                        <a href={'tel:+' + this.props.driver.phone} className="phone-btn"><img  alt=""/></a>
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

export default connect(mapStateToProps)(DriverRoad);