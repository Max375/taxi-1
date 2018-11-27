import React, { Component } from 'react';
import './FooterButton.css';
import loader from '../../assets/img/loader.svg';

function FooterButton(props){
        return <button onClick={props.onClick} className={'footer-button'}>{props.isLoading ? (<img src={loader} alt="" className={'loader'}/>)  : props.nameButton}</button>;
}

export default FooterButton;