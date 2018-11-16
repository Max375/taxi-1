import React, { Component } from 'react';
import './Logo.css';
import logo from '../../../assets/img/logo.png';


function Logo(props) {


    //TODO ACTIONS THIS
    return (
        <div className="logo-description">
            <div className="logo">
                <img src={logo} />
            </div>
            <p className="h1">{props.mainText}</p>
            {props.secondaryText!==null && (<p>{props.secondaryText}</p>)}
        </div>
    );
}

export default Logo;

/*
class Logo extends Component {
    render() {
        return (
            <div className="logo_descr">
                <div className="logo">
                    <img src={logo} />
                </div>
                <p className="h1">Вход</p>
                <p>Вход в приложение</p>
            </div>
        );
    }
}


function Logo() {

    //TODO ACTIONS THIS
    return (
        <div className="logo_descr">
            <div className="logo">
                <img src={logo} />
            </div>
            <p className="h1">Вход</p>
            <p>Вход в приложение</p>
        </div>
    );
}


 */