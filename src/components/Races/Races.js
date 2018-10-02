import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar.js';
import connect from "react-redux/es/connect/connect";
import './Races.css';
import Vw from '../../assets/img/vw.png'
import OrderInput from "../OrderInput/OrderInput";


class Races extends Component {



    render(){
        console.log(this.props);
        let endPoints = [];
        for (let i = 0; i < this.props.order.endPoints.length; ++i){
            endPoints.push(
                <div className="races-point">
                    {this.props.order.endPoints[i].label}
                </div>
            )
        }

        return (
            <React.Fragment>
                <TopBar/>
               <div className="wrapper">
                   <div className="races-point">
                       {this.props.order.startPoint.label}
                   </div>

                   <div className="races-info">
                       <div className="races-person">
                           <img src={require("../../assets/img/face.png")} alt=""/>
                           <div className="vertical-person-data">
                               <div className="name">
                                   {this.props.user.name}
                               </div>
                               <div className="score">
                                   <i className="fa fa-star active" aria-hidden="true"></i>
                                   3.5
                               </div>
                           </div>
                       </div>
                   </div>


                   <div className="races-info">
                       <div className="races-person">
                           <img src={require("../../assets/img/vw.png")} alt=""/>
                           <div className="vertical-person-data">
                               <div className="name">
                                   {this.props.driver.car.version}
                               </div>
                           </div>
                       </div>
                   </div>

                   <div className="order-info">
                       <div className="price">
                           <div className="title">Цена</div>
                           {this.props.order.price} р
                       </div>
                       <div className="time">
                           <div className="title">Время поездки</div>
                           8 мин
                       </div>

                   </div>

                   <div className="pay-type">
                       <img width='30px' src={require("../../assets/img/icons/money.svg")} alt=""/> Оплата наличными
                   </div>

                   {endPoints}

               </div>
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

export default connect(mapStateToProps)(Races);
