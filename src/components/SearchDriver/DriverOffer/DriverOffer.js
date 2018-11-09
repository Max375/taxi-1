import VW from '../../../assets/img/vw.png'
import BMW from '../../../assets/img/bmw.png'
import React from "react";
import {acceptOrder, cancelOrder, removeTrade} from "../../../fetch/fetch";
import changeScreenAction from "../../../actions/changeScreenAction";
import Road from "../../Road/Road";
import LoadImage from "../../../assets/img/load.gif";
import Order from "../../Order/Order/Order";
import BackBtn from "../../../assets/img/icons/button.svg";
import locationPushAction from "../../../actions/locationPushAction";
import setDriverInfo from '../../../actions/setDriverInfoAction'

export default function DriverOffer(props) {

    let touchStartPosition = 0;
    let touchEndPosition = 0;

    const touchStartHandler = (e)=>{
        touchStartPosition = e.touches[0].clientX;
    };

    const touchMoveHandler = (e) => {
        e.currentTarget.style.transform = `translateX(${e.touches[0].clientX-touchStartPosition }px)`;
        touchEndPosition = e.touches[0].clientX;
    };

    const touchEndHandler = (e) =>{
        if (Math.abs(touchStartPosition-touchEndPosition)>200){
            console.log('cancel trade');
            console.log(Math.abs(touchStartPosition-touchEndPosition),'abs');
            console.log(touchStartPosition,'start');
            console.log(touchEndPosition,'end');
          try {
              removeTrade(props.data.order_id, props.data.driver_id, props.token).then(()=>{
                  props.callback(props.data);
              });


              const el = e.currentTarget;

              el.style.transition = `transform 0.15s ease`;
              el.style.transform = `translateX(${-window.innerWidth}px)`;
              setTimeout(() => {
                  el.style.height = 0;
                  el.style.marginTop = 0;
                  el.style.padding = 0;
              }, 150)
          }
          catch (e) {
              console.error(e);
          }
        }
        else{
            e.currentTarget.style.transform = `translateX(0px)`;
        }
    };


    let car_image = (<img src={VW} alt=""/>);

    switch(props.data.admin_car_models_name) {
        case 'VW':
            car_image = (<img src={VW} alt=""/>);
            break;
        case 'BMW':
            car_image = (<img src={BMW} alt=""/>);
            break;
    }

    console.log(props,'offer props');
    return (
        <div class="driver-wrapper" onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
            <div class="run-line"></div>
            <div class="flex-wrapp">
                <div class="driver-info">
                    <div class="driver-img">
                        {car_image}
                    </div>
                    <div class="driver-name">
                        <p>{props.data.car_version}</p>
                        <i class="fa fa-star" aria-hidden="true"></i>{props.data.rating} / {props.data.car_year} г
                    </div>
                </div>
                <div class="car-info">
                    <div class="kilometers">
                        <p>{props.data.time_to_client} мин</p>
                    </div>
                    <div class="price">{props.data.price}р</div>
                </div>
            </div>


            <div class="driver-buttons">
                <button onClick={()=>{
                    acceptOrder(props.data.order_id,props.data.driver_id,props.token)
                        .then(data=>{


                            if (data!=null){
                                props.dispatch(locationPushAction(data.info.location));
                                props.dispatch(setDriverInfo(data.info));
                                props.dispatch(changeScreenAction(<Road/>))
                            }
                        });
                }}>Принять</button>
            </div>
        </div>
    )
}