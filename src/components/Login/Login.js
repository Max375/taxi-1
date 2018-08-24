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




class Login extends Component {
    constructor(props) {
        super(props);
        this.NumberInput = null;
    }


    sendLogin(){
        const number =this.NumberInput.value;
        loginUser(parseInt(number)).then((data) => {
                if (data===true){
                    this.props.dispatch(addPhoneNumber(number));
                    this.props.dispatch(changeScreenAction(<EnterPin/>));
                }
                else{
                    this.NumberInput.classList.add('enter-input__input--invalid');
                }
        }).catch(e => {
            console.log(e);
            console.log('not connn');
        });
    }

    setNumberInput(el){
        this.NumberInput = el;
    }



    render() {
        return (<div className="screen_wp">
                <div className="wrapper">
                    <Logo />
                    <div className="enter-input">
                        <input ref={this.setNumberInput.bind(this)} className="enter-input__input" type="text" placeholder="Номер телефона" />
                    </div>
                    <div className="remember">
                        <label> <input type="checkbox"/>Запомнить меня</label>
                    </div>

                    <button className="enter" href="#" onClick={this.sendLogin.bind(this)}>Войти</button>
                    <a className="reg" href="enter.html">Регистрация <img src={icon} alt="" /></a>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(Login);