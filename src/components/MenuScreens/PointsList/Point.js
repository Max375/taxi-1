import selectStar from "../../../assets/img/select_star.png";
import React from "react";

export default  function Point(props) {
    console.log(props);
    return (<div className="saved-address">
        <div className="star-area">
            <img src={selectStar} alt=""/>
        </div>
        <div className="address-area">
            <div className="your-address-name">{props.info.title}</div>
            <div className="map-point">{props.info.address}</div>
        </div>
    </div>)
}