import React , {Component} from 'react';

import './Total.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import Vw from '../../assets/img/vw.png'

class Total extends Component{

    render(){
        return(
            <React.Fragment>
                <TopBar/>
               <div className="total-price">
                   К оплате, руб
                   <span>9</span>
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
                <button className="estimate">Оценить</button>
            </React.Fragment>
        )


    }

}

export default Total;