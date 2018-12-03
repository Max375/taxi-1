import React, { Component } from 'react';
import './PromoCode.css';
import promocodeCard from "../../../assets/img/promocode_card.png";
import Button from "../../Button/Button";
import HeaderBack from "../../HeaderBack/HeaderBack";
import {doSync, setUserInfo, store} from "../../../secondary";
import connect from "react-redux/es/connect/connect";
import {getUserInfo, usePromocode} from "../../../fetch/fetch";
import {customConsole} from "../../../utils";
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../../Authorization/Login/Login";
import clearTokenAction from "../../../actions/clearTokenAction";

class PromoCode extends Component {

    input = null;

    state = {
        message: '',
        isValid: false,
        isLoading: false
    };

    sendPromocode = ()=>{
        this.setState({isLoading: true});
        usePromocode(this.input.value.trim(),this.props.user.token)
            .then(()=>{
                this.setState({
                    message: 'Ваш промокод применен',
                    isValid: true,
                    isLoading: false,
                });

                getUserInfo(this.props.user.token)
                    .then(data => {
                        setUserInfo(data);
                    })
                    .catch(err => {
                        customConsole.error(err);
                        store.dispatch(changeScreenAction(<Login />));
                        store.dispatch(clearTokenAction());
                    });

            })
            .catch(()=>{
                this.setState({
                    message: 'Не удалось найти данный промокод',
                    isValid: false,
                    isLoading: false,
                })
            })
    };

    render(){
        return(
            <div className={'promo-code container'}>
                <HeaderBack onClick={doSync} headerTitle={'Промокод'}/>
                <div className="calc-content without-footer">
                    <div className="your-promo-code-wrapper">
                        <p className="h1">Ваш промокод</p>
                        <p className="text">Используйте этот промокод для того, чтобы приглашать друзей в наше приложение.
                            И Вы, и Ваш друг, получите бонус!</p>
                        <div className="your-promo-code">
                            {this.props.user.promocode}
                        </div>
                    </div>

                    <div className={'enter-promo-code-wrapper'}>
                        <img src={promocodeCard} alt=""/>
                        <p className="h1">Ввести промокод</p>
                        <p className="text">Промокод позволяет получить бонусы, которые можно использовать для оплаты</p>
                        <div className={'warning'}>{this.state.message}</div>
                        <input ref={el =>{this.input = el;}} type="text" className={'enter-promo-code'} placeholder={'промокод'}/>
                        <Button isLoading={this.state.isLoading} onClick={this.sendPromocode} text={'ввести'}/>
                    </div>

                    <p className="send-code-friends">Отправить код друзьям</p>
                    <div className="social-wrapper">
                        <button className={'social-network vk'}></button>
                        <button className={'social-network tw'}></button>
                        <button className={'social-network fb'}></button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(PromoCode);

