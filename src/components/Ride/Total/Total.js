import React , {Component} from 'react';

import './Total.css';
import connect from "react-redux/es/connect/connect";
import {setRating} from "../../../fetch/fetch"
import HeaderWithMenu from '../../HeaderWithMenu/HeaderWithMenu';
import bigStar from '../../../assets/img/big_star.png';
import bigStarEmpty from '../../../assets/img/big_star_empty.png';
import Button from "../../Button/Button";
import changeScreenAction from "../../../actions/changeScreenAction";
import Feedback from "../Feedback/Feedback";
import {getFinishInfo} from '../../../fetch/fetch';
import clearTokenAction from "../../../actions/clearTokenAction";
import {doSync} from "../../../secondary";

class Total extends Component{


    state = {
        rating: 0,
        bonusPayment: 0,
        distance: 0,
        time: 0,
        totalPayment: 0
    };

    componentDidMount(){
        getFinishInfo(this.props.user.token)
            .then(data=>{
                console.log(data);
                this.setState({
                    bonusPayment: data.bonusPayment,
                    distance: data.distance,
                    time: data.time,
                    totalPayment: data.totalPayment
                })
            })
            .catch(e=>{
                this.props.dispatch(clearTokenAction());
                doSync();
            })
    }

    render(){
        let elements = [];

        for (let i = 0; i<this.state.rating; i++) elements.push(<img src={bigStar} onClick={()=>{this.setState({rating: i+1})}} />);
        for (let i = this.state.rating; i<5; i++) elements.push(<img src={bigStarEmpty} onClick={()=>{this.setState({rating: i+1})}} />);

        return(
            <div className={'trip-completed container'}>
                <HeaderWithMenu headerTitle={'Поездка завершена'} />
                <div className="calc-content without-footer">
                    <div className="flex-inner">
                        <div className="header-total-sum">
                            <p>Сумма к оплате</p>
                            <div className={'value'}>{this.state.totalPayment} BYN</div>
                            <div className={'numder-of-bonus'}>{this.state.bonusPayment} Бонусов</div>
                            <p>{this.props.order.card === 0 ? 'Наличные': 'Карта'}</p>
                        </div>
                        <div className="distance-time">
                            <div className="distance-time-distance">
                                Расстояние: <span>{this.state.distance} км</span>
                            </div>
                            <div className="distance-time-time">
                                Время: <span>{this.state.time} мин</span>
                            </div>
                        </div>
                        <p className={'h1'}>Оцените поездку</p>
                        <div className="stars-container">
                            {elements}
                        </div>

                        <div className="press-down">
                            <Button text={'завершить'}/>
                            <button onClick={()=>{this.props.dispatch(changeScreenAction(<Feedback/>))}} className={'button-leave-feedback'}>
                                <p>оставить отзыв</p>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        driver: state.driver,
    };
};

export default connect(mapStateToProps)(Total);
