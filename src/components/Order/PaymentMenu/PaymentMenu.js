import React from 'react';
import './PaymentMenu.css';
import Button from '../../Button/Button'
import connect from "react-redux/es/connect/connect";
import setCardIdAction from '../../../actions/ordersActions/setCardIdAction'
import {doSync} from "../../../secondary";


function PaymentMenu(props){

    const setCardIdHandler = function(id){
        return ()=>{
            props.dispatch(setCardIdAction(id));
        }
    };


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

    return (
        <React.Fragment>
            <div onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler} className={props.isVisible ? 'left-popup-menu card-payment-popup card-payment-popup--open':'left-popup-menu card-payment-popup'}>
                <div className="left-popup-menu-content">
                    <div className="flex-top-wrapper">
                        <p className={'popup-title'}>Выберите способ оплаты</p>

                        <input defaultChecked={0 === props.selectedCard} type="radio" id={'cash'} name={'choose-card'} onChange={setCardIdHandler(0)} />
                        <label htmlFor={'cash'}>
                            Наличные
                        </label>

                        {
                            props.cards.map(el=>{
                                return(
                                    <React.Fragment>
                                        <input defaultChecked={el.id === props.selectedCard}
                                               type="radio"
                                               id={'card-id-' + el.id}
                                               className={'first-card'}
                                               name={'choose-card'}
                                               onChange={setCardIdHandler(el.id)}
                                        />
                                        <label htmlFor={'card-id-' + el.id}>
                                            {el.brand} ****{el.lastDigits}
                                        </label>
                                    </React.Fragment>
                                )
                            })
                        }

                    </div>

                    <div className="flex-bottom-wrapper">
                        <Button onClick={props.closeMenu} text={'применить'}/>
                        <button className={'button-add-card'}>добавить карту</button>
                    </div>
                </div>
            </div>
            <div onClick={props.closeMenu} className="black-bg" />
        </React.Fragment>
    );
}


const mapStateToProps = (state) => {
    return {
        cards: state.cards.cards,
        selectedCard: state.order.card
    };
};

export default connect(mapStateToProps)(PaymentMenu);