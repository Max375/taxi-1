import React, { Component } from 'react';

import burger from '../../assets/img/burger.svg';
import dots from '../../assets/img/dots.svg';
import './TopBar.css';
import Menu from "../Menu/Menu";

class TopBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            isMenuVisible: false,
        }
    }


    openMenu(){
        this.setState({isMenuVisible: true})
    }

    closeMenu(){
        this.setState({isMenuVisible: false})
    }

    render(){
        return (
            <React.Fragment>
                <div className="top-bar">

                    <div className="burger" onClick={this.openMenu.bind(this)}>
                        <img src={burger} alt="" className="top-bar--toggle-button" />
                    </div>

                    <ul className="top-bar--menu">
                        <li><button className="active">Заказ такси</button></li>
                        <li><button >Поездки</button></li>
                    </ul>

                    <div className="dots">
                        <img src={dots} alt="" className="top-bar--dot-button" />
                    </div>

                </div>

                <Menu isVisible={this.state.isMenuVisible} clickHandler={this.closeMenu.bind(this)}/>

            </React.Fragment>
        )
    }
}

export default TopBar;