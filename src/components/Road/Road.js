import React , {Component} from 'react';

import './Road.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import Vw from '../../assets/img/vw.png'
import RoadMap from '../RoadMap/RoadMap'


class Road extends Component{

    render(){
        return(
            <React.Fragment>
                <TopBar/>
                <div className="red">
                    <RoadMap />
                </div>
                <div className="way-info">
                    <div className="drive-wp">
                        <div className="driver">
                            <div className="driver-img">
                                <img src={Vw} alt=""/>
                            </div>
                            <div className="driver-car">
                                <p>Volkswagen krafter</p>
                                <div className="year-wp">
                                    <span className="year">2010 г</span>
                                    <span className="color">Черный</span>
                                </div>

                                <div className="rating"><i className="fa fa-star" aria-hidden="true"></i>3.4</div>
                            </div>
                        </div>


                        <div className="time-wp">
                            <div className="time-img">
                                <img src={Time} alt=""/>
                            </div>
                            <div className="time">
                                <p>8 минут</p>
                            </div>
                        </div>
                    </div>

                    <div className="second-line">

                    </div>
                    <div className="phone">
                                    <div className="probeg">
                                        Пробег <br/>7км
                                    </div>
                                    <a href='tel:+375296212524' className="phone-btn"><img src={Phone} alt=""/></a>
                                    <button className="cancel">Отменить <i className="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                </div>
            </React.Fragment>
        )


    }

}

export default Road;