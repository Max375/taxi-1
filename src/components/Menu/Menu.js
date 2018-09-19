import React, { Component } from 'react';
import './Menu.css'
import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../actions/changeScreenAction";
import FavoritePoints from "../FavoritePoints/FavoritePoints";
import Order from "../Order/Order";


function Menu(props) {
    return(
        <React.Fragment>
        <div className={props.isVisible ? 'menu-bg menu-bg-open' : 'menu-bg'} onClick={props.clickHandler}></div>

            <div className={props.isVisible ? 'menu menu-open' : 'menu'}>
                <div className="menu-top">
                    <img src="img/photo.png" alt="" />
                    <div className="name">
                        Александр Чернышев
                    </div>
                    <div className="menu-top--count">
                        Поездок <span>26</span>
                    </div>
                    <div className="menu-top--distance">
                        Общее расстояние <span>429</span>
                    </div>
                </div>

                <div className="menu-bonus">
                    <div className="menu-bonus--count">Бонусный счет: 10 руб.</div>
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
                    <li><img src="img/icons/promo.svg" alt="" /><a href="#">Промокод</a></li>
                    <li><img src="img/icons/icon-technical-support.svg" alt="" /><a href="#">Техподдержка</a></li>
                    <li onClick={()=>{localStorage.clear(); console.log('+++');  navigator.app.exitApp();}}><img src="img/icons/out.svg" alt=""  /><a href="#">Выход</a></li>
                </ul>
            </div>
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        app: state.app
    };
};

export default connect(mapStateToProps)(Menu);
