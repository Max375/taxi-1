import driverPhoto from "../../../assets/img/driver_konstantin.png";
import signHyundaiLittle from "../../../assets/img/sign_hyundai_little.png";
import Button from "../../Button/Button";
import React from "react";
import './DriverInfo.css';
import connect from "react-redux/es/connect/connect";
import {carModelCheck, getDistanceBetweenToPoints} from "../../../utils";
import changeScreenAction from "../../../actions/changeScreenAction";
import Feedback from "../Feedback/Feedback";

function DriverInfo(props) {


    console.log(props);

    let time = 0;

    try{
        time = getDistanceBetweenToPoints(props.driver.location, props.order.endPoint.location)*2;
        if (time <= 1) time = 1;
    }
    catch (e) {
        time = 5;
    }


    return(
        <div className={'driver-process'}>
            <div className="driver-process-top-row">
                <div className="top-row-coll">
                    <div className="title">{time} мин.</div>
                    <p>Осталось ехать</p>
                </div>
                <div className="top-row-coll">
                    <div className="title">{props.order.price} Br</div>
                    <p>Стоимость поездки</p>
                </div>
            </div>

            <div className="driver-process__bottom-row">
                <div className="route-point first-address">{props.order.startPoint.address}</div>
                <div className="route-point second-address">{props.order.endPoint.address}</div>

                <div className="driver-rating-model-block">
                    <img src={driverPhoto} alt=""/>
                    <div className="name-rating-model-subblock">
                        <div className="driver-name">{props.driver.name}</div>
                        <div className={'car-rating'}>
                            <div className="little-star"></div>
                            <div className="car-point">{props.driver.rating}</div>
                        </div>
                        <div className="car-sign-model-subblock">
                            {carModelCheck(props.driver.car.model)}
                            <div  className="car-model">{props.driver.car.version}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        driver: state.driver,
    };
};

export default connect(mapStateToProps)(DriverInfo);
