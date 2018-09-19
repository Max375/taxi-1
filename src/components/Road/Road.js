import React , {Component} from 'react';

import './Road.css';
import TopBar from "../TopBar/TopBar";
import Time from '../../assets/img/time.png'
import Phone from '../../assets/img/phone.png'
import Vw from '../../assets/img/vw.png'
import RoadMap from '../RoadMap/RoadMap'
import connect from "react-redux/es/connect/connect";


class Road extends Component{

    state = {
        time: 0
    };

    componentDidMount(){
        console.log('++++');
        console.log(this.props);
        console.log(this.props.order);
    }

    render(){
        return(
            <React.Fragment>
                <TopBar/>
                <div className="red">
                    <RoadMap endPoint={this.props.order.startPoint.value}  startPoint={this.props.info.location} />
                </div>
                <div className="way-info">
                    <div className="drive-wp">
                        <div className="driver">
                            <div className="driver-img">
                                <img src={Vw} alt=""/>
                            </div>
                            <div className="driver-car">
                                <p>{this.props.info.car.version}</p>
                                <div className="year-wp">
                                    <span className="year">{this.props.info.car.year} г</span>
                                    <span className="color">{this.props.info.car.color}</span>
                                </div>

                                <div className="rating"><i className="fa fa-star" aria-hidden="true"></i>{this.props.info.rating}</div>
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
                                    <a href={'tel:+' + this.props.info.phone} className="phone-btn"><img src={Phone} alt=""/></a>
                                    <button className="cancel">Отменить <i className="fa fa-times" aria-hidden="true"></i></button>
                    </div>
                </div>
            </React.Fragment>
        )


    }

}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
    };
};

export default connect(mapStateToProps)(Road);