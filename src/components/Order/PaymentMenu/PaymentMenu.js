import React from 'react';
import './PaymentMenu.css';
import Button from '../../Button/Button'

function PaymentMenu(props){
    return (
        <div className="left-popup-menu card-payment-popup">
            <div className="left-popup-menu-content">
                <div className="flex-top-wrapper">
                    <p className={'popup-title'}>Выберите способ оплаты</p>
                    <input type="radio" id={'cash'} name={'choose-card'} />
                    <label htmlFor={'cash'}>
                        Наличные
                    </label>

                    <input type="radio" id={'first-card'} name={'choose-card'}/>
                    <label htmlFor={'first-card'}>
                        Visa ****2590
                    </label>

                    <input type="radio" id={'second-card'} name={'choose-card'}/>
                    <label htmlFor={'second-card'}>
                        MasterCard ****6712
                    </label>
                </div>

                <div className="flex-bottom-wrapper">
                    <Button text={'применить'}/>
                    <button className={'button-add-card'}>добавить карту</button>
                </div>
            </div>
        </div>
    );
}

export default PaymentMenu;