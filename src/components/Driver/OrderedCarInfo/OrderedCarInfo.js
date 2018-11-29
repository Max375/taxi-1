import React, { Component } from 'react';
import './OrderedCarInfo.css';
import {carModelCheck, getDistanceBetweenToPoints} from '../../../utils'
import connect from "react-redux/es/connect/connect";

function OrderedCarInfo(props) {

    console.log(props);

    let time = 0;

    try{
        time = getDistanceBetweenToPoints(props.driver.location,props.order.startPoint.value)*2;
        if (time <= 1) time = 1;
    }
    catch (e) {
        time = 5;
    }
    
    return (
            <div className={'ordered-car-info'}>
                <div className={'ordered-car-info__top-row'}>
                    <div className={'top-row__left-coll'}>
                        {carModelCheck(props.driver.car.model)}
                        <div className={'year-of-manufacture'}>{props.driver.car.year} г.в.</div>
                    </div>
                    <div className={'top-row__right-coll'}>
                        <div className={'model-color-flex-wrapper'}>
                            <div className={'right-coll__car-model'}>{props.driver.car.version}</div>
                            <div  style={{backgroundColor: props.driver.car.colorCode}} className={'right-coll__car-color'}>{props.driver.car.color}</div>
                        </div>
                        <div className={'right-coll__car-rating'}>
                            <div className="little-star"></div>
                            <div className="right-coll__car-point">{props.driver.rating}</div>
                        </div>

                        <div className="arrival-time">
                            Будет через: <span>{time} мин.</span>
                        </div>
                    </div>
                </div>
                <div className={'ordered-car-info__bottom-row'}>
                    <a className={'button-call'} href={`tel:+${props.driver.phone}`}>позвонить</a>
                    <button onClick={props.openMenu} className={'button-cancel'}>отменить</button>
                </div>
            </div>
        )
}


const mapStateToProps = (state) => {
    return {
        order: state.order,
        driver: state.driver
    };
};

export default connect(mapStateToProps)(OrderedCarInfo);
