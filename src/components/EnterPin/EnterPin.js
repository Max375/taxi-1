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

class EnterPin extends Component {
    constructor(props) {
        super(props);
        this.NumberInput = null;
    }

    setNumberInput(el){
        this.NumberInput = el;
    }

    login(){
        sendPin(this.props.phone, this.NumberInput.value).then((data)=>{
            if (data!=false){
                this.props.dispatch(setUserInfoAction(data));
                this.props.dispatch(changeScreenAction(<Order />));
            }
        });
    }

    render() {
        return (<div className="screen_wp">
                <div className="wrapper">
                    <Logo />
                    <div className="sms">Мы выслали вам <span>смс сообщение</span> c кодом для входа в приложение</div>
                    <div className="enter-input">
                        <input ref={this.setNumberInput.bind(this)} className="enter-input__input" type="text" placeholder="Код, пример: 7643" />
                    </div>

                    <a className="again" href="#">Выслать повторно</a>

                    <button className="enter" href="#" onClick={this.login.bind(this)} >Войти</button>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(EnterPin);