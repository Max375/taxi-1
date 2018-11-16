import React, { Component } from 'react';
import './PromocodeMenu.css'
import {invite_exist} from '../../../fetch/fetch'

export default class PromocodeMenu extends Component{

    input=null;

    state = {
      message: null,
      err: false,
      isPromocodeDone: false,
      promocode: null
    };

    render(){
        console.log(this.state.isPromocodeDone );
       return(
           <React.Fragment>

               {!this.state.isPromocodeDone &&
               <div className={this.props.isOpen ? "message-menu-bg message-menu-bg--open" : "message-menu-bg"} onClick={this.props.closeMenu}>
                    <div className="message-menu">
                        <div>Есть промокод от друга ?</div>
                        <div>Вводи и получи бонус</div>
                        <input
                            onClick={(e)=>{
                                e.stopPropagation();
                            }}
                            ref = {el=>{
                                this.input = el;
                            }} type="text"/>
                        <button
                            onClick={(e)=>{
                                console.log(this.input.value);
                                const promocode = this.input.value.trim();
                                invite_exist(promocode)
                                    .then(()=>{
                                        console.log('exist');
                                        console.log(this.props);

                                        this.setState({
                                            isPromocodeDone: true,
                                            promocode: promocode
                                        });

                                        this.props.promocodeAccess(promocode);
                                    })
                                    .catch((e)=>{
                                        console.log('not-exist');

                                        this.setState({
                                            err: true,
                                            message: 'Такого промокода не существует'
                                        });

                                        e.then((e)=>{
                                            console.err(e);
                                        })
                                    });
                                e.stopPropagation();
                            }}
                        >Проверить</button>
                        {this.state.message!==null && <div className={this.state.err? 'promocode-done': 'promocode-reject'} >{this.state.message}</div>}
                    </div>
                </div>}

               {this.state.isPromocodeDone &&
                <div className={this.props.isOpen ? "message-menu-bg message-menu-bg--open" : "message-menu-bg"} onClick={this.props.closeMenu}>
                    <div className="message-menu">
                        <div>Ваш промокод принят</div>
                        <div>{this.state.promocode}</div>
                        <button>Ок</button>
                        {this.state.message!==null && <div className={this.state.err? 'promocode-done': 'promocode-reject'} >{this.state.message}</div>}
                    </div>
                </div>}

           </React.Fragment>

    )}
}