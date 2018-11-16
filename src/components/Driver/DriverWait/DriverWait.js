import React , {Component} from 'react';

import './DriverWait.css';
import TopBar from "../../TopBar/TopBar";
import connect from "react-redux/es/connect/connect";
import TimeMenu from '../TimeMenu/TimeMenu'
import menuPushAction from "../../../actions/menuPushAction";
import {carModelCheck} from "../../../utils";

class DriverWait extends Component{

    state = {
        time: 0,
        cancelOpen: false,
    };


    closeTimeMenu = () =>{
        this.props.dispatch(menuPushAction(false));
    };


    render(){


        return(
            <React.Fragment>
                <TimeMenu token={this.props.user.token} isOpen={this.props.push.menu} closeMenu={this.closeTimeMenu} />
                <TopBar/>
                <div className="way-info">
                    <div className="search">Вас ожидает</div>
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

                    </div>

                    <div className="red">
                        <button onClick={()=>{
                            this.props.dispatch(menuPushAction(true));
                        }}>Через сколько вы будете ?</button>
                    </div>

                    <div className="second-line">

                    </div>
                    <div className="phone wait-phone">

                                    <a href={'tel:+' + this.props.driver.phone} className="phone-btn"><img  alt=""/></a>
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