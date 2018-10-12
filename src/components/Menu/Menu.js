import React, { Component } from 'react';
import './Menu.css'
import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../actions/changeScreenAction";
import FavoritePoints from "../FavoritePoints/FavoritePoints";
import Order from "../Order/Order";
import Promocodes from "../Promocodes/Promocodes";


function Menu(props) {
    return(
        <React.Fragment>
        <div className={props.isVisible ? 'menu-bg menu-bg-open' : 'menu-bg'} onClick={props.clickHandler}></div>

            <div className={props.isVisible ? 'menu menu-open' : 'menu'}>
                <div className="menu-top">
                    <img src="img/photo.png" alt="" />
                    <div className="name">
                        {props.user.name}
                    </div>
                    <div className="menu-top--count">
                        Поездок <span>{props.user.num_trip}</span>
                    </div>
                </div>

                <div className="menu-bonus">
                    <div className="menu-bonus--count">Бонусный счет: {props.user.bonus} руб.</div>
                </div>

                <ul className="first">
                    <li onClick={()=>{console.log(props.dispatch(changeScreenAction(<Order/>)))}}><img src="img/icons/galka.svg" alt="" /><a href="#">Заказ такси</a></li>
                    <li><img src="img/icons/car.svg" alt="" /><a href="#">История поездок</a></li>
                    <li onClick={()=>{console.log(props.dispatch(changeScreenAction(<FavoritePoints/>)))}}><img src="img/icons/car.svg" alt="" /><a href="#">Любимые адреса</a></li>
                    <li><img src="img/icons/money.svg" alt="" /><a href="#">Способ оплаты</a></li>
                </ul>

                <ul className="second">
                    <li><img src="img/icons/settings.svg" alt="" /><a href="#">Настройка</a></li>
                    <li><img src="img/icons/rule.svg" alt="" /><a href="#">Стать водителем</a></li>
                    <li
                        onClick={()=>{
                            props.dispatch(changeScreenAction(<Promocodes />));
                        }}
                    ><img src="img/icons/promo.svg" alt=""/><a href="#">Промокод</a></li>
                    <li><img src="img/icons/icon-technical-support.svg" alt="" /><a href={`https://test.kak-pravilno.by/taxi/feedback_form.php?phone=${props.user.phone}&driver=false`}>Техподдержка</a></li>
                    <li onClick={()=>{localStorage.clear(); console.log('+++');  navigator.app.exitApp();}}><img src="img/icons/out.svg" alt=""  /><a href="#">Выход</a></li>
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
