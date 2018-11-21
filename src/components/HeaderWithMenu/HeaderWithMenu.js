import React, { Component } from 'react';
import './HeaderWithMenu.css';
import Menu from "../Menu/Menu";

class HeaderWithMenu extends React.Component {

    state = {
        isMenuVisible: false
    };

    openMenu = () =>{ this.setState({isMenuVisible: true})};
    closeMenu = () =>{ this.setState({isMenuVisible: false})};

    render() {
        return (
            <React.Fragment>
                <div className={'header-type-two'}>
                    <button onClick={this.openMenu} className={'header-burger-menu'} />
                    <p className={'header__title'}> {this.props.headerTitle}</p>
                </div>
                <Menu closeMenu={this.closeMenu} isOpen={this.state.isMenuVisible}/>
            </React.Fragment>
        )
    }
}
export default HeaderWithMenu;