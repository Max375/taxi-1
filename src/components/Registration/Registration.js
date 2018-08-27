import React, { Component } from 'react';
import icon from '../../assets/img/list.png';
import { connect } from 'react-redux';
import LogoImage from '../../assets/img/Logo.png';
import './Registration.css'
import changeScreenAction from "../../actions/changeScreenAction";
import Login from "../Login/Login";
import {regUser, HTTP_STATUS_BAD_REQUEST} from "../../fetch/fetch"
import addPhoneNumber from "../../actions/addPhoneNumberAction";
import EnterPin from "../EnterPin/EnterPin";

class Registration extends Component {
   state = {
       isNameValid: true,
       nameErrMessage: null,
       isNumberValid: true,
       numberErrMessage: null,
   };



    constructor(props) {
        super(props);
        this.nameRefs = null;
        this.numberRefs = null;
    }



    validateNumber(number){
        const regexp = /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
        return number.search(regexp) !== -1;
    }


    validateName(name){
        const regexp = /^[а-яА-ЯёЁ]+$/;
        return name.search(regexp) !== -1;
    }

    _onClickSendButton = () => {
        const number =this.numberRefs.value;
        const name = this.nameRefs.value;
        console.log(number);

        const isNameValid = this.validateName(name);
        const isNumberValid = this.validateNumber(number);


        if (isNameValid && isNumberValid) {
            this.setState({
                isNameValid: true,
                isNumberValid: true,
            });

            regUser(parseInt(number), name)
                .then((isRegister)=>{
                    if (isRegister){
                        this.props.dispatch(addPhoneNumber(number));
                        this.props.dispatch(changeScreenAction(<EnterPin prevScreen={'Registration'}/>));
                    }
                    else{
                        this.setState({
                            isNumberValid: false,
                            numberErrMessage: 'Пользователь уже зарегестрирован',
                        });
                    }
                });
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



    render() {
        return (<div className="screen_wp">
            <div className="wrapper">
                <div className="logo">
                    <img src={LogoImage} alt="Blitz"/>
                    <p>здесь должен быть слоган</p>
                </div>

                <div className="enter-inputs">
                    <div className={this.state.isNameValid ? "enter-input" : "enter-input enter-input--invalid"}>
                        <div className="enter-input__invalid-text">
                            {this.state.nameErrMessage}
                        </div>
                        <input ref={(el) => {this.nameRefs= el;}}  className="enter-input__input" type="text" placeholder="Имя" />
                    </div>

                    <div  className={this.state.isNumberValid ? "enter-input" : "enter-input enter-input--invalid"}>
                        <div className="enter-input__invalid-text">
                            {this.state.numberErrMessage}
                        </div>
                        <input ref={(el) => {this.numberRefs = el;}}  className="enter-input__input" type="text" placeholder="Номер телефона" />
                    </div>
                </div>

                <button className="enter" onClick={this._onClickSendButton}>Регистрация</button>
                <div  className="reg" onClick={()=>{this.props.dispatch(changeScreenAction(<Login/>))}}>Войти <img src={icon} alt="" /></div>
            </div>
                </div>
        );
    }
} 


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(Registration);