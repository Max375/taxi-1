import React, { Component } from 'react';
import icon from '../../../assets/img/list.png';
import { connect } from 'react-redux';
import LogoImage from '../../../assets/img/Logo.png';
import './Registration.css'
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../Login/Login";
import {registration} from "../../../fetch/fetch"
import addPhoneNumber from "../../../actions/addPhoneNumberAction";
import EnterPin from "../EnterPin/EnterPin";
import PromocodeMenu from "../../PromocodeMenu/PromocodeMenu";

import {validateName,validateNumber} from "../../../utils";

class Registration extends Component {

    state = {
       isNameValid: true,
       nameErrMessage: null,
       isNumberValid: true,
       numberErrMessage: null,
       promocode: null,
       isPromocodeMenuOpen: false,
   };


    nameInput = null;
    numberInput = null;


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

        registration(number, name, promocode,deviceId)
            .then(()=>{
                    this.props.dispatch(addPhoneNumber(number));
                    this.props.dispatch(changeScreenAction(<EnterPin prevScreen={'Registration'}/>));
            })
            .catch(e =>{
                this.setState({
                    isNumberValid: false,
                    numberErrMessage: 'Пользователь уже зарегестрирован',
                });
            });
    };

    onClickSendButton = () => {
        const number = this.numberInput.value;
        const name = this.nameInput.value;


        const isNameValid = validateName(name);
        const isNumberValid = validateNumber(number);


        if (isNameValid && isNumberValid) {
            this.registrationUser(parseInt(number), name, this.state.promocode, this.props.app.deviceId);
            return;
        }

        let nameErrMessage = '';
        if (!isNameValid) switch (name) {
            case '':{
                nameErrMessage = 'Имя не может быть пустым';
                break;
            }
            default:
                nameErrMessage = 'Пожалуйста введите корректное имя'
        }

        let numberErrMessage = '';

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
            numberErrMessage: numberErrMessage,
            nameErrMessage: nameErrMessage
        })
    };


    closePromocodeMenu = ()=>{this.setState({isPromocodeMenuOpen: false})};
    openPromocodeMenu = ()=>{this.setState({isPromocodeMenuOpen: true})};

    nameInputSetRef = (el)=>{this.nameInput= el};
    numberInputSetRef = (el)=>{this.numberInput= el};

    onClickLoginButton = () => {this.props.dispatch(changeScreenAction(<Login />))};


    render() {
        return (
            <div class="screen_wp">
                    <PromocodeMenu
                        promocodeAccess={this.setPromocode}
                        isOpen={this.state.isPromocodeMenuOpen}
                        closeMenu={this.closePromocodeMenu}
                    />

                    <div class="wrapper">
                            <div class="logo">
                                <img src={LogoImage} alt="Blitz"/>
                                <p>здесь должен быть слоган</p>
                            </div>

                            <div class="enter-inputs">
                                <div class={this.state.isNameValid ? "enter-input" : "enter-input enter-input--invalid"}>
                                    <div class="enter-input__invalid-text">
                                        {this.state.nameErrMessage}
                                    </div>
                                    <input ref={this.nameInputSetRef}  class="enter-input__input" type="text" placeholder="Имя" />
                                </div>
                                <div  class={this.state.isNumberValid ? "enter-input" : "enter-input enter-input--invalid"}>
                                    <div class="enter-input__invalid-text">
                                        {this.state.numberErrMessage}
                                    </div>
                                    <input ref={this.numberInputSetRef}  class="enter-input__input" type="text" placeholder="Номер телефона" />
                                </div>
                            </div>

                            <button class="enter" onClick={this.onClickSendButton}>Регистрация</button>
                            <div class="again" onClick={this.openPromocodeMenu}>Есть промокод?</div>
                            <div  class="reg" onClick={this.onClickLoginButton}>Войти <img src={icon} alt="" /></div>
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