import React from 'react';
import './Menu.css'
import connect from "react-redux/es/connect/connect";
import DriverMenu from '../../assets/img/driver_menu.png';


function Menu(props) {

    let touchStartPosition = 0;
    let touchEndPosition = 0;
    let isMenuMoving = true;

    let buttons = null;

    const touchStartHandler = (e)=>{
        touchStartPosition = e.touches[0].clientX;
        touchEndPosition = e.touches[0].clientX;
        e.currentTarget.style.transition = 'none';
    };

    const touchMoveHandler = (e) => {
        if(e.touches[0].clientX < touchStartPosition && isMenuMoving){
            e.currentTarget.style.transform = `translateX(${e.touches[0].clientX-touchStartPosition}px)`;
            touchEndPosition = e.touches[0].clientX;
        }
    };

    const touchEndHandler = (e) =>{

        e.currentTarget.style.transform = null;
        e.currentTarget.style.transition = null;
        isMenuMoving = true;
        if (Math.abs(touchStartPosition-touchEndPosition)>80 && touchEndPosition<touchStartPosition && isMenuMoving){
            close();
        }

    };


    const onTouchStartButtons = ()=>{
        isMenuMoving = false;
    };

    const onTouchEndButtons = ()=>{
        isMenuMoving = true;
    };

    const close = ()=>{
        buttons.scrollTop = 0;
        props.closeMenu();
    };

    return (
        <React.Fragment>

            <div onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler} className={props.isOpen ? 'menu container menu--open' : 'menu container'}>
                <div className="menu-header">
                    <img src={DriverMenu} alt=""/>
                    <div className={'driver-name'}>Антон Черышев</div>
                    <div className={'bonus-account'}>Бонусный счет: 50 руб.</div>
                    <div className={'mileage'}>25 поездок, всего 557 км</div>
                </div>

                <div ref={(el)=>{buttons = el}} onTouchStart={onTouchStartButtons} onTouchEnd={onTouchEndButtons} className={'button-block'}>
                    <button className={'taxi-request'}>Заказ такси</button>
                    <button className={'trips-history'}>История поездок</button>
                    <button className={'favorite-addresses'}>Любимые адреса</button>
                    <button className={'payment-method more-space-bottom'}>Способ оплаты</button>

                    <div className={'stripe'}/>

                    <button className={'settings with-border-top'}>Настройка</button>
                    <button className={'become-to-driver'}>Стать водителем</button>
                    <button className={'promo-code-btn'}>Промокод</button>
                    <button className={'tech-support'}>Техподдержка</button>
                    <button className={'exit'}>Выход</button>
                </div>
            </div>
            <div onClick={close} className={"black-bg"} />
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
