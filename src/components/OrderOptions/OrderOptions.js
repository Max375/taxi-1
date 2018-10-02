import React, { Component } from 'react';
import './OrderOptions.css'
import Girl from '../../assets/img/girl.png'
import Pet from '../../assets/img/pet.png'
import Case from '../../assets/img/case.png'

export default function OrderOptions(props){



    function  handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        props.options[name] = +value;
        event.stopPropagation();
    }


    return (
        <React.Fragment>
            <div className={props.isVisible ? 'option-bg option-bg-open' : 'option-bg'} onClick={props.clickHandler}>
            </div>
        <div className={(props.isVisible) ? 'extra extra-open' : 'extra'}>
                    <div className="extra-wrapp clearfix">
                        <div className="extra-header">
                            Дополнительные услуги
                        </div>
                    </div>

                    <div className="extra-inputs clearfix">
                        <label><input name="gender" type="checkbox" onChange={handleInputChange}/>Девушка водитель <img src={Girl}/></label>
                        <label><input name="ads" type="checkbox" onChange={handleInputChange} />Авто без рекламы</label>
                        <label><input name="baggadge" type="checkbox" onChange={handleInputChange} />Багаж <img src={Case}/></label>
                        <label><input name="dog_place" type="checkbox" onChange={handleInputChange} />Перевозка животного <img src={Pet}/></label>
                        <label><input name="smoking" type="checkbox" onChange={handleInputChange} />Не курящий водитель</label>
                        <label><input name="english" type="checkbox" onChange={handleInputChange} />Англоговорящий водитель</label>
                        <label><input name="baby_seat" type="checkbox" onChange={handleInputChange} />Детское кресло</label>
                    </div>
                </div>
        </React.Fragment>
    );
}