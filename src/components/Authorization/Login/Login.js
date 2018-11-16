import React, { Component } from 'react';
import './Login.css';
import {smsAuth} from '../../../fetch/fetch'
import { connect } from 'react-redux';
import changeScreenAction from '../../../actions/changeScreenAction'
import addPhoneNumber from '../../../actions/addPhoneNumberAction'
import EnterPin from "../EnterPin/EnterPin";
import Registration from "../Registration/Registration";
import {validateNumber} from '../../../utils';
import Logo from '../Logo/Logo'
import Button from '../../Button/Button'
import TransparentButton from "../TransparentButton/TransparentButton";
import {isEnterPressed} from '../../../utils';

class Login extends Component {
    state = {
        isValid: true,
        errorText: '',
        IsButtonLoading: false
    };

    numberInput = null;

    sendLogin(number){
        return smsAuth(parseInt(number))
            .catch(e => {
                console.error(e);
                this.setState({
                    errorText: 'Пользователя с таким номером не существует',
                    isValid: false,
                })
            });
    }

    componentDidMount = ()=>{
        document.body.addEventListener('keydown',this.loginFromKeyboard);
    };

    componentWillUnmount = ()=>{
        document.body.removeEventListener('keydown',this.loginFromKeyboard);
    };

    onClickSendButton = () => {

        this.setState({IsButtonLoading: true});
        const number = this.numberInput.value || '';

        if (validateNumber(number)) {
            this.sendLogin(number)
                .then(()=>{
                    this.setState({IsButtonLoading: false});
                    this.props.dispatch(addPhoneNumber(parseInt(number)));
                    this.props.dispatch(changeScreenAction(<EnterPin  prevScreen={'Login'}/>));
                });
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
        this.setState({IsButtonLoading: false});
    };

    loginFromKeyboard = (e) => {
        if(isEnterPressed(e)){
            this.onClickSendButton();
        }
    };



    onClickRegistrationButton = () => {this.props.dispatch(changeScreenAction(<Registration/>))};

    inputSetRef = (el) => {this.numberInput = el};


    render() {
        return (

            <div className="login container">
                <div className="screen-wrapper">
                    <Logo mainText={'Вход'} secondaryText={'Вход в приложение'} />

                    <div className={this.state.isValid ? "entrance": "entrance entrance--invalid"}>
                        <div className="entrance-error-text">{this.state.errorText || " "}</div>
                        <input  ref={this.inputSetRef} type="text"
                                placeholder={'ваш телефон'}/>
                        <Button isLoading={this.state.IsButtonLoading}  onClick={this.onClickSendButton} text={'Войти'} />
                        <TransparentButton  onClick={this.onClickRegistrationButton} nameButton={'Регистрация'} />
                    </div>
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