import React , {Component} from 'react';

import './Total.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import Vw from '../../assets/img/vw.png'
import connect from "react-redux/es/connect/connect";
import changeScreenAction from "../../actions/changeScreenAction";
import Order from "../Order/Order";

class Total extends Component{

    render(){
        return(
            <React.Fragment>
                <TopBar/>
               <div className="total-price">
                   К оплате, руб
                   <span>{this.props.order.price}</span>
               </div>
                <div className="total-wp">
                    <div className="total-ds">
                        Расстояние <br/>
                        <span>59 км</span>
                    </div>
                    <div className="total-time">
                        Время <br/>
                        <span>10 мин</span>
                    </div>
                </div>
                <div className="total-rating">
                    <i className="fa fa-star active" aria-hidden="true"></i>
                    <i className="fa fa-star active" aria-hidden="true"></i>
                    <i className="fa fa-star active" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                </div>
                <button className="estimate"
                onClick={()=>{
                    this.props.dispatch(changeScreenAction(<Order reset={true}/>));
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
