import React, { Component } from 'react';

export default function MessageMenu(props){

    return(
        <div className={props.isOpen ? "message-menu-bg message-menu-bg--open" : "message-menu-bg"} onClick={props.closeMenu}>
            <div className="message-menu">
                <div>Водитель подъехал и ожидает вас.</div>
                <div>Как скоро вы будете?</div>
                <button>Выхожу</button>
                <button>5 мин</button>
                <button>15 мин</button>
                <button>20 мин</button>
            </div>
        </div>
    )
}