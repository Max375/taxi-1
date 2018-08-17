import React, { Component } from 'react';
import icon from '../../assets/img/list.png';
import { connect } from 'react-redux';

class Registration extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }


    render() {
        return (<div className="screen_wp">
            <div className="wrapper">
                <div className="logo">
                    <img  alt="Blitz" />
                    <p>здесь должен быть слоган</p>
                </div>
                <div className="enter-inputs">
                    <input type="text" placeholder="Номер телефона" />
                    <input type="text" placeholder="Пароль" />
                        <label> <input type="checkbox" />Запомнить меня </label>
                    <a href="#">Забыли пароль?</a>
                </div>

                <a className="enter" href="#">Войти</a>
                <a className="reg" href="enter.html">Регистрация <img src={icon} alt="" /></a>
            </div>
                </div>
        );
    }
} 


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(Registration);