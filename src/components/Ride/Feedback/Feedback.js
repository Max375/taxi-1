import React, { Component } from 'react';
import './Feedback.css';
import FooterButton from '../../FooterButton/FooterButton';
import HeaderWithMenu from "../../HeaderWithMenu/HeaderWithMenu";
import HeaderBack from "../../HeaderBack/HeaderBack";
import {doSync} from "../../../secondary";

class Feedback extends Component {

    state ={
        comment: "",
        isBlackChecked: false,
        isFavoriteChecked: false,
        isLoading: false
    };

    blackCheckerUpdate = ()=>{
        this.setState({
            isBlackChecked: !this.state.isBlackChecked,
            isFavoriteChecked: false
        })
    };

    favoriteCheckerUpdate = ()=>{
        this.setState({
            isBlackChecked: false,
            isFavoriteChecked: !this.state.isFavoriteChecked
        })
    };

    render() {
        return (
            <div className={'feedback container'}>
                <HeaderBack onClick={doSync} headerTitle={'Отзыв о поездке'}/>
                <div className="feedback-content">
                    <div className="flex-top">
                        <p className={'h2'}>Текст отзыва</p>
                        <textarea onChange={(e)=>{this.setState({comment: e.target.value})}}>{this.state.comment}</textarea>
                    </div>
                    <div className="flex-bottom">
                        <input type="checkbox"
                               id={'add-to-favorites'}
                               name={'driver-assesment'}
                               onChange={this.favoriteCheckerUpdate}
                               checked={this.state.isFavoriteChecked}/>
                        <label htmlFor="add-to-favorites">Добавить в Избранное</label>
                        <input type="checkbox"
                               id={'add-to-black-list'}
                               name={'driver-assesment'}
                               onChange={this.blackCheckerUpdate}
                               checked={this.state.isBlackChecked} />
                        <label htmlFor="add-to-black-list">Добавить в черный список</label>
                    </div>
                </div>
                <FooterButton onClick={()=>{
                    
                }} isLoading={this.state.isLoading} nameButton={'отправить отзыв'}/>
            </div>
        );
    }
}

export default Feedback;