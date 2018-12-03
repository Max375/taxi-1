import React, { Component } from 'react';
import './CancelOrderMenu.css'
import Button from "../../Button/Button";
import {cancelOrder, getUserInfo} from "../../../fetch/fetch";
import {doSync, setUserInfo, store} from "../../../secondary";
import {customConsole} from "../../../utils";
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../../Authorization/Login/Login";
import clearTokenAction from "../../../actions/clearTokenAction";

class CancelOrderMenu extends Component{

    state ={
        isLoading: false,
        isDisable: false,
        keyword: 'Заказал по ошибке',
    };


    touchStartPosition = 0;
    touchEndPosition = 0;


    touchStartHandler = (e)=>{
        this.touchStartPosition = e.touches[0].clientX;
        this.touchEndPosition = e.touches[0].clientX;
        e.currentTarget.style.transition = 'none';
    };

    touchMoveHandler = (e) => {
        if(e.touches[0].clientX > this.touchStartPosition && !this.state.isLoading){
            e.currentTarget.style.transform = `translateX(${e.touches[0].clientX-this.touchStartPosition}px)`;
            this.touchEndPosition = e.touches[0].clientX;
        }
    };

    touchEndHandler = (e) =>{

        e.currentTarget.style.transform = null;
        e.currentTarget.style.transition = null;
        if (Math.abs(this.touchStartPosition-this.touchEndPosition)>80 && this.touchEndPosition > this.touchStartPosition){
            this.props.closeMenu();
        }

    };

    cancelOrderHandler = ()=>{
        this.setState({isLoading: true, isDisable: true});
        cancelOrder(this.props.token, this.state.keyword)
            .then(()=>{
                getUserInfo(this.props.token)
                    .then(data => {
                        setUserInfo(data);
                        this.setState({isLoading: false, isDisable: false});
                        doSync();
                    })
                    .catch(err => {
                        customConsole.error(err);
                        this.setState({isLoading: false, isDisable: false});
                        this.props.dispatch(changeScreenAction(<Login />));
                        this.props.dispatch(clearTokenAction());
                    });
            })
            .catch(()=>{
                this.setState({isLoading: false, isDisable: false});
                getUserInfo(this.props.token)
                    .then(data => {
                        setUserInfo(data);
                        this.setState({isLoading: false, isDisable: false});
                        doSync();
                    })
                    .catch(err => {
                        this.setState({isLoading: false, isDisable: false});
                        customConsole.error(err);
                        this.props.dispatch(changeScreenAction(<Login />));
                        this.props.dispatch(clearTokenAction());
                    });
            })
    };

    render(){
        return(
            <React.Fragment>
                <div onTouchStart={this.touchStartHandler} onTouchMove={this.touchMoveHandler} onTouchEnd={this.touchEndHandler}  className={this.props.isVisible ? "left-popup-menu left-popup-menu--open": "left-popup-menu"}>
                    <div className="left-popup-menu-content">
                        <div className="press-down">
                            <p className={'popup-title'}>Причина отмены поездки</p>
                            <div>
                                <input value={'Заказал по ошибке'}
                                       type="radio" id={'ordered-by-mistake'}
                                       name={'car-class'}
                                       defaultChecked={true}
                                       onChange={(e)=>{this.setState({keyword: e.target.value})}}
                                       disabled={this.state.isDisable} />
                                     <label htmlFor={'ordered-by-mistake'}>
                                    Заказал по ошибке
                                </label>
                            </div>

                            <div>
                                <input
                                    value={'Слишком долго ждать'}
                                    type="radio" id={'too-long-waiting'}
                                    name={'car-class'}
                                    onChange={(e)=>{this.setState({keyword: e.target.value})}}
                                    disabled={this.state.isDisable}/>
                                <label htmlFor={'too-long-waiting'}>
                                    Слишком долго ждать
                                </label>
                            </div>

                            <div>
                                <input
                                    value={'По просьбе водителя'}
                                    type="radio"
                                    id={'wish-of-driver'}
                                    name={'car-class'}
                                    onChange={(e)=>{this.setState({keyword: e.target.value})}}
                                    disabled={this.state.isDisable}/>
                                <label htmlFor={'wish-of-driver'}>
                                    По просьбе водителя
                                </label>
                            </div>

                            <div>
                                <input
                                    value={'Такси не приехало'}
                                    type="radio"
                                    id={'taxi-didnt-arrived'}
                                    name={'car-class'}
                                    onChange={(e)=>{this.setState({keyword: e.target.value})}}
                                    disabled={this.state.isDisable}/>
                                <label htmlFor={'taxi-didnt-arrived'}>
                                    Такси не приехало
                                </label>
                            </div>

                            <div>
                                <input value={'Передумал ехать'} type="radio" id={'changed-my-mind'} name={'car-class'} disabled={this.state.isDisable}/>
                                <label htmlFor={'changed-my-mind'} className={'push-button-bottom'}>
                                    Передумал ехать
                                </label>
                            </div>
                            <Button isLoading={this.state.isLoading}  onClick={this.cancelOrderHandler} text={'отменить поездку'}/>
                        </div>
                    </div>
                </div>
                <div onClick={
                    ()=>{if(!this.state.isLoading) this.props.closeMenu();}
                } className='black-bg'/>
            </React.Fragment>
        )
    }
}

export default CancelOrderMenu;