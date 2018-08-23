import React, { Component } from 'react';
import './OrderOptions.css'

export default function OrderOptions(props){

    return (
                <div className={(props.isVisible) ? 'extra extra-open' : 'extra'}>
                    <div className="extra-wrapp clearfix">
                        <div className="extra-header">
                            Дополнительные услуги
                        </div>
                    </div>

                    <div className="extra-inputs clearfix">
                        <label><input type="checkbox" />Курьер</label>
                        <label><input type="checkbox" />Водитель не курит</label>
                        <label><input type="checkbox" />Багаж</label>
                        <label><input type="checkbox" />Перевозка животного</label>
                        <label><input type="checkbox" />Кондиционер</label>
                        <label><input type="checkbox" />Англоговорящий водитель</label>
                        <label><input type="checkbox" />Встреча с табличкой</label>
                        <label><input type="checkbox" />Неразговорчивый водитель</label>
                    </div>
                </div>
    );
}