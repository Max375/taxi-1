import React, { Component } from 'react';
import './OrderOptions.css'
import Girl from '../../assets/img/girl.png'
import Pet from '../../assets/img/pet.png'
import Case from '../../assets/img/case.png'

export default function OrderOptions(props){

    return (
                <div className={(props.isVisible) ? 'extra extra-open' : 'extra'}>
                    <div className="extra-wrapp clearfix">
                        <div className="extra-header">
                            Дополнительные услуги
                        </div>
                    </div>

                    <div className="extra-inputs clearfix">
                        <label><input type="checkbox" />Девушка водитель <img src={Girl}/></label>
                        <label><input type="checkbox" />Авто без рекламы</label>
                        <label><input type="checkbox" />Багаж <img src={Case}/></label>
                        <label><input type="checkbox" />Перевозка животного <img src={Pet}/></label>
                        <label><input type="checkbox" />Кондиционер</label>
                        <label><input type="checkbox" />Англоговорящий водитель</label>
                        <label><input type="checkbox" />Детское кресло</label>
                        <label><input type="checkbox" />Неразговорчивый водитель</label>
                    </div>
                </div>
    );
}