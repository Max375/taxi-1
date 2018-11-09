import React, { Component } from 'react';
import './Login.css';


import icon from '../../../assets/img/list.png';

import {smsAuth} from '../../../fetch/fetch'

import Logo from '../Logo/Logo';

import { connect } from 'react-redux';

import changeScreenAction from '../../../actions/changeScreenAction'

import addPhoneNumber from '../../../actions/addPhoneNumberAction'
import EnterPin from "../EnterPin/EnterPin";
import Registration from "../Registration/Registration";
import {validateNumber} from '../../../utils';




class Login extends Component {

    state = {
        isValid: true,
        errorText: '',
    };

    numberInput = null;


    sendLogin(number){
        smsAuth(parseInt(number))
                .then(() => {
                    this.props.dispatch(addPhoneNumber(parseInt(number)));
                    this.props.dispatch(changeScreenAction(<EnterPin  prevScreen={'Login'}/>));
                })
                .catch(e => {
                    console.error(e);

                    this.setState({
                        errorText: 'Пользователя с таким номером не существует',
                        isValid: false,
                    })
                });
    }





    onClickSendButton = () => {
        const number =this.numberInput.value;

        if (validateNumber(number)) {
            this.sendLogin(number);
            return;
        }

            let errMessage = '';
            switch (number) {
                case '':
                    errMessage = 'Телефон не может быть пустым';
                    break;
                default:
                    errMessage = 'Пожалуйста введите корректный телефон';
                    break;
            }

            this.setState({
                errorText: errMessage,
                isValid: false,
            });
    };


    onClickRegistrationButton = () => {this.props.dispatch(changeScreenAction(<Registration/>))};

    inputSetRef = (el) => {this.numberInput = el};

    render() {
        return (<div class="screen_wp">
                <div class="wrapper">
                    <Logo />

                    <div class={this.state.isValid ? "enter-input" : "enter-input enter-input--invalid"}>
                        <div class="enter-input__invalid-text">
                            {this.state.errorText}
                        </div>
                        <input ref={this.inputSetRef} class="enter-input__input" type="text" placeholder="Номер телефона" />
                    </div>

                    <button class="enter" onClick={this.onClickSendButton}>Войти</button>
                    <div class="reg" onClick={this.onClickRegistrationButton}>Регистрация <img src={icon}/></div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Login);