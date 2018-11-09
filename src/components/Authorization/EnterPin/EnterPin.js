import React, { Component } from 'react';

import './EnterPin.css';

import {login} from '../../../fetch/fetch'

import Logo from '../Logo/Logo';

import { connect } from 'react-redux';
import Back from '../../Authorization/Back/Back.js';
import {setUserInfo} from "../../../secondary";
import {doSync} from "../../../secondary";

class EnterPin extends Component {

    state = {
       errorText: null,
       isValid: true,
   };

    numberInput = null;

    constructor(props) {
        super(props);
    }



    sendLogin(number,pin,deviceId){
        login(number,pin,deviceId)
            .then((data)=>{
                setUserInfo(data);
                doSync();
            }).catch((e)=>{
                console.error(e);
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


    onClickSendButton = () => {
        const pin = this.numberInput.value;
        if (this.validatePin(pin)) {
            this.sendLogin(this.props.user.phone, pin, this.props.app.deviceId);
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

    inputSetRef = (el) =>{this.numberInput = el};


    render() {
        return (<div class="screen_wp">
                <Back screen={this.props.prevScreen} />


                <div class="wrapper">

                    <Logo />
                    <div class="sms">Мы выслали <span>смс сообщение</span> c кодом на номер <span>{this.props.phone}</span></div>
                    <div class={this.state.isValid ? "enter-input" : "enter-input enter-input--invalid"}>
                        <div class="enter-input__invalid-text">
                            {this.state.errorText}
                        </div>
                        <input ref={this.inputSetRef} class="enter-input__input" type="text" placeholder="Код, пример: 7643" />
                    </div>

                    <button class="enter" href="#" onClick={this.onClickSendButton} >Войти</button>

                    <a class="again" href="#">Выслать повторно</a>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        app: state.app
    }
};

export default connect(mapStateToProps)(EnterPin);