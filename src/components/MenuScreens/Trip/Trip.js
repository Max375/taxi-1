import reFresh from "../../../assets/img/refresh.png";
import React from "react";


function Trip(props) {
    console.log(props.info);
    return (<div className="trip-information">
        <div className="time-route">
            <div className="date-time">
                <p className="date">{props.info.lastModification.replace(' ',", ").replace(/[-]/g,' ').slice(0,-3)}</p>
                <p className="time">15 мин</p>
            </div>
            <div className="route">
                <div className="route-point-a">
                    <span className={'dot'}></span>
                    {props.info.locationFrom}
                </div>
                <div className="route-point-b">
                    <span className={'dot'} />
                    {props.info.locationTo.pop()}
                </div>
            </div>
        </div>
        <div className="price">
            <p>{props.info.price} BYN</p>

        </div>
    </div>)
}

export default Trip;