import React, { Component } from 'react';
import icon from '../../assets/img/list.png';
import { connect } from 'react-redux';
import LogoImage from '../../assets/img/Logo.png';
import './Registration.css'

class Registration extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }


    render() {
        return (<div className="screen_wp">
            <div className="wrapper">
                <div className="logo">
                    <img src={LogoImage} alt="Blitz"/>
                    <p>здесь должен быть слоган</p>
                </div>
                <div className="enter-inputs">
                    <input type="text" placeholder="Имя" />
                    <input type="text" placeholder="Номер телефона" />
                </div>

                <button className="enter">Регистрация</button>
                <a href="" className="reg">Войти <img src={icon} alt="" /></a>
            </div>
                </div>
        );
    }
} 


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(Registration);