import React, { Component } from 'react';
import './EnterPin.css';
import {login} from '../../../fetch/fetch'
import { connect } from 'react-redux';
import Back from '../../Authorization/Back/Back.js';
import {setUserInfo} from "../../../secondary";
import {doSync} from "../../../secondary";
import './EnterPin.css';
import Logo from '../Logo/Logo';
import Button from "../../Button/Button";
import TransparentButton from "../TransparentButton/TransparentButton";
import {isEnterPressed} from "../../../utils";

class EnterPin extends Component {

    state = {
        errorText: null,
        isValid: true,
        IsButtonLoading: false
    };

    numberInput = [];

    constructor(props) {
        super(props);
    }


    componentDidMount = ()=>{
        document.body.addEventListener('keydown',this.loginFromKeyboard);
    };

    componentWillUnmount = ()=>{
        document.body.removeEventListener('keydown',this.loginFromKeyboard);
    };


    loginFromKeyboard = (e) => {
        if(isEnterPressed(e)){
            this.onClickSendButton();
        }
    };


    sendLogin(number,pin,deviceId){
        return login(number,pin,deviceId)
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
        const pin = this.numberInput.map(el=>el.value).join('');
        this.setState({IsButtonLoading: true});
        if (this.validatePin(pin)) {
            this.sendLogin(this.props.user.phone, pin, this.props.app.deviceId)
                .then(()=>{
                    this.setState({IsButtonLoading: false});
                });
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
        });
        this.setState({IsButtonLoading: false});
    };

    inputSetRef = (index)=>{
        return (el) =>{this.numberInput[index] = el;}
    };


    createInputMakeChange = function(arr, index){
        let oldStr = null;

        return function (e) {
            if (oldStr === null) oldStr = e.target.value;
            else{
                e.target.value =  e.target.value.replace(oldStr,'');
                oldStr = e.target.value;
            }
            arr[index].focus();
        }
    };


    render() {
        return (
            <div className="enter-pin container">
                <div className="screen-wrapper">
                    <Back screen={this.props.prevScreen} />
                    <Logo mainText={'Подтверждение'} secondaryText={null} />
                    <p className="clarification">
                        Мы выслали Вам СМС сообщением код для входа в приложение
                    </p>
                    <div className={this.state.isValid ? "inputs-wrapper" : "inputs-wrapper inputs-wrapper--invalid"}>
                        <div className={'inputs-wrapper-error-text'}>{this.state.errorText}</div>
                        <div className={"inputs-wrapper-wp"}>
                            <input ref={this.inputSetRef(0)} onChange={this.createInputMakeChange(this.numberInput, 1)} type="number" placeholder={"x"}/>
                            <input ref={this.inputSetRef(1)} onChange={this.createInputMakeChange(this.numberInput, 2)} type="number" placeholder={"x"}/>
                            <input ref={this.inputSetRef(2)} onChange={this.createInputMakeChange(this.numberInput, 3)} type="number" placeholder={"x"}/>
                            <input ref={this.inputSetRef(3)} onChange={this.createInputMakeChange(this.numberInput, 3)} type="number" placeholder={"x"}/>
                        </div>
                    </div>
                    <Button isLoading={this.state.IsButtonLoading} onClick={this.onClickSendButton} text={'Войти'} />
                    <TransparentButton nameButton={'Выслать код повторно'} />
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