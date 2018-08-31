import BMW from "../../assets/img/bmw.png";
import React from "react";
import {acceptOrder} from "../../fetch/fetch";

export default function DriverOffer(props) {
    console.log(props);
    return (
        <div className="driver-wrapper">
            <div className="run-line"></div>
            <div className="flex-wrapp">
                <div className="driver-info">
                    <div className="driver-img">
                        <img src={BMW} alt=""/>
                    </div>
                    <div className="driver-name">
                        <p>{props.data.admin_car_models_name + ' ' + props.data.car_version }</p>
                        <i className="fa fa-star" aria-hidden="true"></i>{props.data.rating} / {props.data.car_year} г
                    </div>
                </div>
                <div className="car-info">
                    <div className="kilometers">
                        <p>{props.data.time_to_client} мин</p>
                    </div>
                    <div className="price">{props.data.price}р</div>
                </div>
            </div>


            <div className="driver-buttons">
                <button onClick={()=>{
                    acceptOrder(props.data.order_id,props.data.driver_id,props.token);
                }}>Принять</button>
            </div>
        </div>
    )
}