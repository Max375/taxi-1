import React, { Component } from 'react';

import './EnterPin.css';

import Load from '../Load/Load'

import icon from '../../assets/img/list.png';

import {sendPin} from '../../fetch/fetch'

import Logo from '../Logo/Logo';

import { connect } from 'react-redux';

import Order from '../Order/Order';

import setUserInfoAction from '../../actions/setUserInfoAction';
import changeScreenAction from "../../actions/changeScreenAction";
import Back from '../Back/Back.js';
import Login from "../Login/Login";

class EnterPin extends Component {
   state = {
       errorText: null,
       isValid: true,
   };

    constructor(props) {
        super(props);
        this.NumberInput = null;
    }

    setNumberInput(el){
        this.NumberInput = el;
    }

    login(){
        sendPin(this.props.phone, this.NumberInput.value, this.props.deviceId).then((data)=>{
            if (data!=false){
                this.props.dispatch(setUserInfoAction(data));
                this.props.dispatch(changeScreenAction(<Order />));
                return;
            }

            this.setState({
                isValid: false,
                errorText: 'Введен неверный PIN',
            });
        });
    }



    validatePin(pin){
        const regexp = /^[0-9]{4}$/;
        return pin.search(regexp) !== -1;
    }


    _onClickSendButton = () => {
        const pin =this.NumberInput.value;
        if (this.validatePin(pin)) {
            this.login(this.props.phone, pin);
            return;
        }


        let errMessage = '';

        switch (pin) {
            case '':
                errMessage = 'Пинкод не может быть пустым';
                break;
            default:
                errMessage = 'Пожалуйста введите корректный PIN';
                break;
        }


        this.setState({
            errorText: errMessage,
            isValid: false,
        })
    };


    render() {
        return (<div className="screen_wp">
                <Back dispatch={this.props.dispatch} screen={this.props.prevScreen} />
                <div className="wrapper">

                    <Logo />
                    <div className="sms">Мы выслали <span>смс сообщение</span> c кодом на номер <span>{this.props.phone}</span></div>
                    <div className={this.state.isValid ? "enter-input" : "enter-input enter-input--invalid"}>
                        <div className="enter-input__invalid-text">
                            {this.state.errorText}
                        </div>
                        <input ref={this.setNumberInput.bind(this)} className="enter-input__input" type="text" placeholder="Код, пример: 7643" />
                    </div>

                    <button className="enter" href="#" onClick={this._onClickSendButton} >Войти</button>

                    <a className="again" href="#">Выслать повторно</a>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(EnterPin);