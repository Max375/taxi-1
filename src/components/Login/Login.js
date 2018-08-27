import React, { Component } from 'react';
import './Login.css';

import Load from '../Load/Load'

import icon from '../../assets/img/list.png';

import {loginUser} from '../../fetch/fetch'

import Logo from '../Logo/Logo';

import { connect } from 'react-redux';

import changeScreenAction from '../../actions/changeScreenAction'

import addPhoneNumber from '../../actions/addPhoneNumberAction'
import EnterPin from "../EnterPin/EnterPin";
import Registration from "../Registration/Registration";




class Login extends Component {

    state = {
        isValid: true,
        errorText: '',
    };



    constructor(props) {
        super(props);
        this.NumberInput = null;
    }


    sendLogin(number){
            loginUser(parseInt(number)).then((data) => {
                if (data===true){
                    this.props.dispatch(addPhoneNumber(number));
                    this.props.dispatch(changeScreenAction(<EnterPin  prevScreen={'Login'}/>));
                    return;
                }

                this.setState({
                    errorText: 'Пользователя с таким номером не существует',
                    isValid: false,
                })

            }).catch(e => {
                console.log('интернет коннекшн');
            });
    }


    validateNumber(number){
        const regexp = /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
        return number.search(regexp) !== -1;
    }

    setNumberInput(el){
        this.NumberInput = el;
    }


    _onClickSendButton = () => {
        const number =this.NumberInput.value;
        if (this.validateNumber(number)) {
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
            })
    };

    render() {
        return (<div className="screen_wp">
                <div className="wrapper">
                    <Logo />
                    <div className={this.state.isValid ? "enter-input" : "enter-input enter-input--invalid"}>
                        <div className="enter-input__invalid-text">
                            {this.state.errorText}
                        </div>
                        <input ref={this.setNumberInput.bind(this)} className="enter-input__input" type="text" placeholder="Номер телефона" />
                    </div>

                    {
                        false && <div className="remember">
                            <label> <input type="checkbox"/>Запомнить меня</label>
                        </div>
                    }

                    <button className="enter" href="#" onClick={this._onClickSendButton}>Войти</button>
                    <div className="reg" onClick={()=>{
                        this.props.dispatch(changeScreenAction(<Registration />))}} >Регистрация <img src={icon} alt="" /></div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log({
        app: state.app,
        user: state.user
    },'eskere   ');
    return {
        app: state.app,
        user: state.user
    };
};

export default connect(mapStateToProps)(Login);