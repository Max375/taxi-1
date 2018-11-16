import React, { Component } from 'react';
import TopBar from '../../TopBar/TopBar.js';
import connect from "react-redux/es/connect/connect";
import './Races.css';
import {getUserInfo} from "../../../fetch/fetch";
import {carModelCheck, customConsole} from "../../../utils";
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../../Authorization/Login/Login";
import clearTokenAction from "../../../actions/clearTokenAction";
import {doSync, setUserInfo, store} from "../../../secondary";


class Races extends Component {



    componentDidMount(){
        getUserInfo(store.getState().user.token)
            .then(data => {
                setUserInfo(data);
                doSync();
                console.log(store.getState());
            })
            .catch(err => {
                customConsole.error(err);
                store.dispatch(changeScreenAction(<Login />));
                store.dispatch(clearTokenAction());
            });
    }


    render(){

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
                           <div className="driver-img">
                               {carModelCheck(this.props.driver.car.model)}
                           </div>
                           <div className="vertical-person-data">
                               <div className="driver-car">
                                   <p>{this.props.driver.car.version}</p>
                                   <div className="year-wp">
                                       <span className="year">{this.props.driver.car.year} г</span>
                                       <span className="color" style={{backgroundColor: this.props.driver.car.colorCode}}>{this.props.driver.car.color}</span>
                                   </div>

                                   <div className="rating"><i className="fa fa-star" aria-hidden="true"></i>{this.props.driver.rating}</div>
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
                       <img width='30px' alt=""/> Оплата наличными
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
