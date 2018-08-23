import React , {Component} from 'react';

import './Driver.css';
import TopBar from "../TopBar/TopBar";
import BMW from '../../assets/img/bmw.png'
class Driver extends Component{

    render(){
        return(

            <React.Fragment>
                <TopBar/>
                <div className="driver-wrapper">
                    <div className="run-line"></div>
                    <div className="flex-wrapp">
                        <div className="driver-info">
                            <div className="driver-img">
                                <img src={BMW} alt=""/>
                            </div>
                            <div className="driver-name">
                                <p>BMW</p>
                                <i className="fa fa-star" aria-hidden="true"></i>3.4 / 2010 г
                            </div>
                        </div>
                        <div className="car-info">
                            <div className="kilometers">
                                <p>8 мин</p>
                            </div>
                            <div className="price">10р</div>
                        </div>
                    </div>
                    <div className="driver-buttons">
                        <button>Принять</button>
                    </div>
                </div>
                <div className="driver-wrapper">
                    <div className="run-line"></div>
                    <div className="flex-wrapp">
                        <div className="driver-info">
                            <div className="driver-img">
                                <img src={BMW} alt=""/>
                            </div>
                            <div className="driver-name">
                                <p>BMW</p>
                                <i className="fa fa-star" aria-hidden="true"></i>3.4 / 2010 г
                            </div>
                        </div>
                        <div className="car-info">
                            <div className="kilometers">
                                <p>8 мин</p>
                            </div>
                            <div className="price">10р</div>
                        </div>
                    </div>
                    <div className="driver-buttons">
                        <button>Принять</button>
                    </div>
                </div>
                <div className="driver-wrapper">
                    <div className="run-line"></div>
                    <div className="flex-wrapp">
                        <div className="driver-info">
                            <div className="driver-img">
                                <img src={BMW} alt=""/>
                            </div>
                            <div className="driver-name">
                                <p>BMW</p>
                                <i className="fa fa-star" aria-hidden="true"></i>3.4 / 2010 г
                            </div>
                        </div>
                        <div className="car-info">
                            <div className="kilometers">
                                <p>8 мин</p>
                            </div>
                            <div className="price">10р</div>
                        </div>
                    </div>
                    <div className="driver-buttons">
                        <button>Принять</button>
                    </div>
                </div>

            </React.Fragment>
        )


    }

}

export default Driver;