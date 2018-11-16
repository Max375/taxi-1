import React, { Component } from 'react';
import './FooterButton.css';

class FooterButton extends React.Component{
    render(){
        return <button onClick={this.props.onClick} className={'footer-button'}>{this.props.nameButton}</button>;
    }
}
export default FooterButton;