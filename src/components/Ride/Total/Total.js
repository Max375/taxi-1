import React , {Component} from 'react';

import './Total.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import Vw from '../../assets/img/vw.png'
import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../actions/changeScreenAction";
import clearDriverInfo from "../../actions/clearDriverInfo";
import clearOrderInfo from "../../actions/ordersActions/removeOrderAction";
import {setRating} from "../../fetch/fetch"

class Total extends Component{


    state = {
        rating: 0
    };

    render(){
        console.log(this.props);
        let elements = [];

        for (let i = 0; i<this.state.rating; i++) elements.push(<i class="fa fa-star active" onClick={()=>{this.setState({rating: i+1})}} aria-hidden="true"></i>);
        for (let i = this.state.rating; i<5; i++) elements.push(<i class="fa fa-star" aria-hidden="true" onClick={()=>{this.setState({rating: i+1})}}></i>);

        return(
            <React.Fragment>
                <TopBar/>
               <div class="total-price">
                   <div>К оплате, руб</div>
                   <span>{this.props.data.order_price}</span>
                   <div>К оплате, бонусы</div>
                   <span>{this.props.data.bonus}</span>
               </div>
                <div class="total-wp">
                    <div class="total-ds">
                        Расстояние <br/>
                        <span>{this.props.data.distance} км</span>
                    </div>
                    <div class="total-time">
                        Время <br/>
                        <span>{this.props.data.time} мин</span>
                    </div>
                </div>
                <div class="total-rating">
                    {elements}
                </div>
                <button class="estimate"
                onClick={()=>{

                    if (this.state.rating != 0) setRating(this.props.order.id, this.state.rating, this.props.user.token);


                    this.props.dispatch(clearDriverInfo());
                    this.props.dispatch(clearOrderInfo());

                    this.props.dispatch(changeScreenAction(<Order/>));

                }}
                >Оценить</button>
            </React.Fragment>
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
