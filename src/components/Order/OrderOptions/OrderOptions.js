import React from 'react';
import './OrderOptions.css'
import setOrderOptionsAction from '../../../actions/ordersActions/setOrderOptionsAction'
import connect from "react-redux/es/connect/connect";
import Button from '../../Button/Button'
import {logStoreState} from "../../../utils";


function OptionsMenu(props){

    let options = props.options;


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




    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        options[name] = +value;

        props.dispatch(setOrderOptionsAction(options));
        event.stopPropagation();
        logStoreState();
    };

        return (
            <React.Fragment>
                <div onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}  className={props.isVisible? "left-popup-menu additional-services additional-services--open": "left-popup-menu additional-services"}>
                    <div className="left-popup-menu-content">
                        <div className="flex-top-wrapper">
                            <p className={'popup-title'}>Дополнительные услуги</p>
                            <input defaultChecked={options.gender} name="gender" id="gender"  type="checkbox" onChange={handleInputChange}/>
                            <label htmlFor={'gender'}>
                                Девушка водитель
                            </label>

                            <input defaultChecked={options.ads}  name="ads" id="ads" type="checkbox" onChange={handleInputChange}/>
                            <label htmlFor={'ads'}>
                                Авто без рекламы
                            </label>

                            <input defaultChecked={options.baggage} name="baggage"  id="baggage" type="checkbox" onChange={handleInputChange}/>
                            <label  htmlFor={'baggage'}>
                                Багаж
                            </label>

                            <input defaultChecked={options.dogPlace}  name="dogPlace" id="dogPlace" type="checkbox" onChange={handleInputChange}/>
                            <label htmlFor={'dogPlace'}>
                                Перевозка животного
                            </label>

                            <input defaultChecked={options.smoking}  name="smoking" id="smoking" type="checkbox" onChange={handleInputChange}  />
                            <label  htmlFor={'smoking'}>
                                Не курящий водитель
                            </label>

                            <input defaultChecked={options.english} name="english" id="english" type="checkbox" onChange={handleInputChange}/>
                            <label defaultChecked={options.english} htmlFor={'english'}>
                                Англоговорящий водитель
                            </label>

                            <input defaultChecked={options.babySeat} name="babySeat"  id="babySeat" type="checkbox" onChange={handleInputChange}/>
                            <label defaultChecked={options.babySeat} htmlFor={'babySeat'}>
                                Детское кресло
                            </label>

                        </div>

                        <div className="flex-bottom-wrapper">
                            <Button onClick={props.closeMenu} text={'применить'}/>
                        </div>
                    </div>
                </div>
                <div onClick={props.closeMenu} className={'black-bg'} />
            </React.Fragment>
        );
}

const mapStateToProps = (state) => {
    return {
        options: state.order.options,
    };
};

export default connect(mapStateToProps)(OptionsMenu);