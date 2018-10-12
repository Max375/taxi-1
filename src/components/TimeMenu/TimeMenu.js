import React, { Component } from 'react';
import {send_time_to_driver} from "../../fetch/fetch";


export default function MessageMenu(props){

    return(
        <div className={props.isOpen ? "message-menu-bg message-menu-bg--open" : "message-menu-bg"} onClick={props.closeMenu}>
            <div className="message-menu">
                <div>Водитель подъехал и ожидает вас.</div>
                <div>Как скоро вы будете?</div>
                <button
                    onClick={()=>{
                        console.log('time');
                        send_time_to_driver(0,props.token).then((data)=>{
                            console.log(data);
                            props.closeMenu();
                        });
                    }}
                >Выхожу</button>
                <button
                    onClick={()=>{
                        console.log('time');

                        send_time_to_driver(10,props.token).then(()=>{
                            props.closeMenu();
                        });
                    }}
                >5 мин</button>
                <button
                    onClick={()=>{
                        console.log('time');

                        send_time_to_driver(15,props.token).then(()=>{
                            props.closeMenu();
                        });
                    }}
                >15 мин</button>
                <button
                    onClick={()=>{
                        console.log('time');

                        send_time_to_driver(20,props.token).then(()=>{
                            props.closeMenu();
                        });
                    }}
                >20 мин</button>
            </div>
        </div>
    )
}