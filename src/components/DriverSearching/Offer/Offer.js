import React, { Component } from 'react';
import './Offer.css';
import signHyundaiBig from '../../../assets/img/sign_hyundai_big.png';
import littleStar from '../../../assets/img/star_purple_little.png';
import {carModelCheck} from "../../../utils";
import loader from "../../../assets/img/loader.svg"

function CarInfo(props){

    let touchStartPosition = 0;
    let touchEndPosition = 0;

    const touchStartHandler = (e)=>{
        touchStartPosition = e.touches[0].clientX;
        touchEndPosition = e.touches[0].clientX;
    };

    const touchMoveHandler = (e) => {
        if(touchStartPosition< e.touches[0].clientX){
            e.currentTarget.style.transform = `translateX(${e.touches[0].clientX-touchStartPosition }px)`;
            touchEndPosition = e.touches[0].clientX;
        }
    };

    /// USE TRANSITION END
    const touchEndHandler = (e) =>{

        if (Math.abs(touchStartPosition-touchEndPosition)>200){

            props.cancelTrade(props.offer.orderId, props.offer.driverId);

            const el = e.currentTarget;

            el.style.transition = `transform 0.15s ease`;
            el.style.transform = `translateX(${window.innerWidth}px)`;
            setTimeout(() => {
                el.style.height = 0;
                el.style.marginTop = 0;
                el.style.padding = 0;
            }, 150)
        }
        else{
            e.currentTarget.style.transform = `translateX(0px)`;
        }
    };

        return (
            <div className={'car-info'} onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
                <div className={'car-info__left-coll'}>
                    {carModelCheck(props.offer.model)}
                    <div className={'year-of-manufacture'}>{props.offer.carYear} г.в.</div>
                </div>
                <div className={'car-info__right-coll'}>
                    <div className="model-rating-wrapper">
                        <div className={'right-coll__car-model'}>{props.offer.carVersion}</div>
                        <div className={'right-coll__car-rating'}>
                            <img src={littleStar} alt=""/>
                            <div className="right-coll__car-point">{props.offer.rating}</div>
                        </div>
                    </div>
                    <div className="time-cost-flex-wrapper">
                        <div className="time">{props.offer.time} мин.</div>
                        <div className="right-coll__cost-trip">{props.offer.price} BYN</div>
                    </div>
                    <button onClick={()=>{
                       props.acceptTrade(props.offer.orderId, props.offer.driverId);
                    }} className={'accept-btn'}>
                        <div><span></span>принять</div>
                    </button>
                </div>
            </div>
        );
}

export default CarInfo;

//{this.state.isLoading ? (<img src={loader} alt="" className={'loader'}/>)  : (<span></span> + "принять") }
