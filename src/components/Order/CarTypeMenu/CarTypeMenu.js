import React from "react";
import './CarTypeMenu.css'
import Button from '../../Button/Button'
import carClassEconomic from "../../../assets/img/car_class_economic.png";
import carClassComfort from "../../../assets/img/car_class_comfort.png";
import carClassVan from "../../../assets/img/car_class_van.png";
import connect from "react-redux/es/connect/connect";
import setOrderCarTypeAction from '../../../actions/ordersActions/setOrderCarTypeAction';
import {logStoreState} from "../../../utils";
function CarTypeMenu(props) {


    let touchStartPosition = 0;
    let touchEndPosition = 0;


    const touchStartHandler = (e)=>{
        touchStartPosition = e.touches[0].clientX;
        touchEndPosition = e.touches[0].clientX;
        e.currentTarget.style.transition = 'none';
    };

    const touchMoveHandler = (e) => {
        if(e.touches[0].clientX > touchStartPosition){
            e.currentTarget.style.transform = `translateX(${e.touches[0].clientX-touchStartPosition}px)`;
            touchEndPosition = e.touches[0].clientX;
        }
    };

    const touchEndHandler = (e) =>{

        e.currentTarget.style.transform = null;
        e.currentTarget.style.transition = null;
        if (Math.abs(touchStartPosition-touchEndPosition)>80 && touchEndPosition > touchStartPosition){
            props.closeMenu();
        }

    };


    const onChangeHandler = (e)=>{
        props.dispatch(setOrderCarTypeAction(e.target.value));
        logStoreState();
    };

    return (
        <React.Fragment>
            <div onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler} className={props.isVisible? 'left-popup-menu car-type-popup car-type-popup--open':'left-popup-menu car-type-popup'}>
                <div className="left-popup-menu-content">
                    <div className="flex-top-wrapper">
                        <p className={'popup-title'}>Выбор класса поездки</p>
                        <input
                            value={'1'}
                            type="radio"
                            id={'economic'}
                            name={'car-class'}
                            checked={props.carType === 1}
                            onChange={onChangeHandler}
                        />
                        <label htmlFor={'economic'}>
                            <div className="img-adaptive-wrapper">
                                <img src={carClassEconomic} alt=""/>
                            </div>
                            <div className="inp-text">
                                Эконом
                                <p>Renault, Lada, Hyundai</p>
                            </div>
                        </label>

                        <input
                            value={'2'}
                            type="radio"
                            id={'comfort'}
                            name={'car-class'}
                            checked={props.carType === 2}
                            onChange={onChangeHandler}
                        />
                        <label htmlFor={'comfort'}>
                            <div className="img-adaptive-wrapper">
                                <img src={carClassComfort} alt=""/>
                            </div>
                            <div className="inp-text">
                                Комфорт
                                <p>Nissan, Mercedes, BMW</p>
                            </div>
                        </label>

                        <input
                            checked={props.carType === 4}
                            value={'4'}
                            type="radio"
                            id={'van'}
                            name={'car-class'}
                            onChange={onChangeHandler}
                        />
                        <label htmlFor={'van'}>
                            <div className="img-adaptive-wrapper">
                                <img src={carClassVan} alt=""/>
                            </div>
                            <div className="inp-text">
                                Минивен
                                <p>Для большой компании</p>
                            </div>
                        </label>

                    </div>
                    <div className="flex-bottom-wrapper">
                        <Button onClick={props.closeMenu} text={'применить'}/>
                    </div>
                </div>
            </div>
            <div onClick={props.closeMenu} className={'black-bg'} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        carType: state.order.options.carType,
    };
};

export default connect(mapStateToProps)(CarTypeMenu);
