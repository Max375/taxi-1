import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Registration.css'
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../Login/Login";
import {registration} from "../../../fetch/fetch"
import addPhoneNumber from "../../../actions/addPhoneNumberAction";
import EnterPin from "../EnterPin/EnterPin";
import PromocodeMenu from "../PromocodeMenu/PromocodeMenu";

import {isEnterPressed, validateName, validateNumber} from "../../../utils";

import './Registration.css';
import Logo from '../Logo/Logo';
import Button from "../../Button/Button";
import TransparentButton from "../TransparentButton/TransparentButton";

class Registration extends Component {

    state = {
       isNameValid: true,
       errMessage: null,
       isNumberValid: true,
       promocode: null,
       isPromocodeMenuOpen: false,
   };


    nameInput = null;
    numberInput = null;

    componentDidMount = ()=>{
        document.body.addEventListener('keydown',this.loginFromKeyboard);
    };

    componentWillUnmount = ()=>{
        document.body.removeEventListener('keydown',this.loginFromKeyboard);
    };


    loginFromKeyboard = (e) => {
        if(isEnterPressed(e)){
            if (!this.state.isPromocodeMenuOpen)  this.onClickSendButton();
        }
    };


    setPromocode = (promocode)=>{
        this.setState({
            promocode: promocode
        });
    };

    registrationUser = (number,name,promocode,deviceId) => {

        this.setState({
            isNameValid: true,
            isNumberValid: true,
        });

       return  registration(number, name, promocode,deviceId)
            .then(()=>{
                    this.props.dispatch(addPhoneNumber(number));
                    this.props.dispatch(changeScreenAction(<EnterPin prevScreen={'Registration'}/>));
            })
            .catch(e =>{
                this.setState({
                    isNumberValid: false,
                    errMessage: 'Пользователь уже зарегестрирован',
                });
            });
    };

    onClickSendButton = () => {
        this.setState({IsButtonLoading: true});
        const number = this.numberInput.value;
        const name = this.nameInput.value;


        const isNameValid = validateName(name);
        const isNumberValid = validateNumber(number);


        if (isNameValid && isNumberValid) {
            this.registrationUser(parseInt(number), name, this.state.promocode, this.props.app.deviceId)
                .then(()=>{
                    this.setState({IsButtonLoading: false});
                });
            return;
        }

        let nameErrMessage = null;
        if (!isNameValid) switch (name) {
            case '':{
                nameErrMessage = 'Имя не может быть пустым';
                break;
            }
            default:
                nameErrMessage = 'Пожалуйста введите корректное имя'
        }

        let numberErrMessage = null;

        if (!isNumberValid) switch (number) {
            case '':
                numberErrMessage = 'Телефон не может быть пустым';
                break;
            default:
                numberErrMessage = 'Пожалуйста введите корректный телефон';
        }

        this.setState({
            isNameValid: isNameValid,
            isNumberValid: isNumberValid,
            errMessage: nameErrMessage || numberErrMessage
        });
        this.setState({IsButtonLoading: false});
    };


    closePromocodeMenu = ()=>{this.setState({isPromocodeMenuOpen: false})};
    openPromocodeMenu = ()=>{this.setState({isPromocodeMenuOpen: true})};

    nameInputSetRef = (el)=>{this.nameInput= el};
    numberInputSetRef = (el)=>{this.numberInput= el};

    onClickLoginButton = () => {this.props.dispatch(changeScreenAction(<Login />))};


    render() {
        return (
            <div className="registration container">
                <div className={this.state.isNumberValid && this.state.isNameValid ? 'screen-wrapper' : 'screen-wrapper screen-wrapper--invalid'}>
                    <PromocodeMenu
                        promocodeAccess={this.setPromocode}
                        isOpen={this.state.isPromocodeMenuOpen}
                        closeMenu={this.closePromocodeMenu}
                    />
                    <Logo mainText={'Регистрация'} secondaryText={'Регистрация в системе'} />

                    <div className="registration-error-text">{this.state.errMessage}</div>
                    <input ref={this.nameInputSetRef} type="text" placeholder={'ваш имя'} className={this.state.isNameValid ? 'first-input': 'first-input input--invalid'}/>

                    <input ref={this.numberInputSetRef} type="text" placeholder={'номер телефона'} className={this.state.isNumberValid ? 'second-input': 'second-input input--invalid'}/>
                    <Button isLoading={this.state.IsButtonLoading} onClick={this.onClickSendButton} text={'Войти'} />
                    <TransparentButton  onClick={this.onClickLoginButton} nameButton={'Уже зарегистрированы?'} />
                    <TransparentButton  onClick={this.openPromocodeMenu} nameButton={'Есть промокод?'} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        app: state.app,
    }
};

export default connect(mapStateToProps)(Registration);


