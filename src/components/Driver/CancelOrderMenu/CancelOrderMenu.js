import React, { Component } from 'react';
import './CancelOrderMenu.css'

export default function MessageMenu(props){

    return(
        <div class={props.isOpen ? "message-menu-bg message-menu-bg--open" : "message-menu-bg"} onClick={props.closeMenu}>
            <div class="message-menu">
                Причина отмены заказа:
                <button onClick={function (e) {
                    e.stopPropagation();
                    console.log(e.currentTarget.innerText);
                    props.selectValue(e.currentTarget.innerText);
                }}>Долгая подача</button>
                <button
                    onClick={function (e) {
                        e.stopPropagation();
                        console.log(e.currentTarget.innerText);
                        props.selectValue(e.currentTarget.innerText);
                    }}
                >Передумал ехать</button>
                <button
                    onClick={function (e) {
                        e.stopPropagation();
                        console.log(e.currentTarget.innerText);
                        props.selectValue(e.currentTarget.innerText);
                    }}
                >Водитель пьян</button>
                <button
                    onClick={function (e) {
                        e.stopPropagation();
                        console.log(e.currentTarget.innerText);
                        props.selectValue(e.currentTarget.innerText);
                    }}
                >Неистовая ярость</button>
                <button
                    onClick={function (e) {
                        e.stopPropagation();
                        console.log(e.currentTarget.innerText);
                        props.selectValue(e.currentTarget.innerText);
                    }}
                >Другое</button>
            </div>
        </div>
    )
}