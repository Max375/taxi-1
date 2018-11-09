import React, { Component } from 'react';
import './Menu.css'
import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../actions/changeScreenAction";
import FavoritePoints from "../FavoritePoints/FavoritePoints";
import Order from "../Order/Order/Order";
import Promocodes from "../Promocodes/Promocodes";


import car from '../../assets/img/icons/car.svg';
import money from '../../assets/img/icons/money.svg';
import settings from '../../assets/img/icons/settings.svg';
import rule from '../../assets/img/icons/rule.svg';
import promo from '../../assets/img/icons/promo.svg';
import technical_support from '../../assets/img/icons/icon-technical-support.svg';

function Menu(props) {
    return(
        <React.Fragment>
        <div class={props.isVisible ? 'menu-bg menu-bg-open' : 'menu-bg'} onClick={props.clickHandler}></div>

            <div class={props.isVisible ? 'menu menu-open' : 'menu'}>
                <div class="menu-top">
                    <img src="img/photo.png" alt="" />
                    <div class="name">
                        {props.user.name}
                    </div>
                    <div class="menu-top--count">
                        Поездок <span>{props.user.num_trip}</span>
                    </div>
                </div>

                <div class="menu-bonus">
                    <div class="menu-bonus--count">Бонусный счет: {props.user.bonus} руб.</div>
                </div>

                <ul class="first">
                    <li onClick={()=>{console.log(props.dispatch(changeScreenAction(<Order/>)))}}><img src="img/icons/galka.svg" alt="" /><a href="#">Заказ такси</a></li>
                    <li><img src={car} alt="" /><a href="#">История поездок</a></li>
                    <li onClick={()=>{console.log(props.dispatch(changeScreenAction(<FavoritePoints/>)))}}><img src="img/icons/car.svg" alt="" /><a href="#">Любимые адреса</a></li>
                    <li><img src={money} alt="" /><a href="#">Способ оплаты</a></li>
                </ul>

                <ul class="second">
                    <li><img src={settings} alt="" /><a href="#">Настройка</a></li>
                    <li><img src={rule} alt="" /><a href="#">Стать водителем</a></li>
                    <li
                        onClick={()=>{
                            props.dispatch(changeScreenAction(<Promocodes />));
                        }}
                    ><img src={promo} alt=""/><a href="#">Промокод</a></li>
                    <li><img src={technical_support} alt="" /><a href={`https://test.kak-pravilno.by/taxi/feedback_form.php?phone=${props.user.phone}&driver=false`}>Техподдержка</a></li>
                    <li onClick={()=>{localStorage.clear(); console.log('+++');  navigator.app.exitApp();}}><img src="../../assets/img/icons/out.svg" alt=""  /><a href="#">Выход</a></li>
                </ul>
            </div>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        app: state.app,
        user: state.user
    };
};

export default connect(mapStateToProps)(Menu);
