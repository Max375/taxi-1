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
                <div class="top-bar">

                    <div class="burger" onClick={this.openMenu.bind(this)}>
                        <img src={burger} alt="" class="top-bar--toggle-button" />
                    </div>

                    <ul class="top-bar--menu">
                        <li><button class="active">Заказ такси</button></li>
                        <li><button >Поездки</button></li>
                    </ul>

                    <div class="dots">
                        <img src={dots} alt="" class="top-bar--dot-button" />
                    </div>

                </div>

                <Menu isVisible={this.state.isMenuVisible} clickHandler={this.closeMenu.bind(this)}/>

            </React.Fragment>
        )
    }
}

export default TopBar;