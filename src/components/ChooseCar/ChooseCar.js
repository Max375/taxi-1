import React , {Component} from 'react';

import './ChooseCar.css';
import Back from '../../assets/img/icons/icon3.svg'
import Step from '../Step/Step'
import Photo from '../../assets/img/photo.png'
import VW from '../../assets/img/vw.png'
class ChooseCar extends Component{

    render(){
        return(

            <React.Fragment>
                <Step/>
                <div className="car-item">
                <div className="car-descr">
                    <div className="car-img">
                        <img src={VW} alt=""/>
                    </div>
                    <div className="car-name">
                        <p>2 TEX 2314</p>
                        Черный Passat
                    </div>
                </div>
                <div className="about-car">
                    <img src={Back} alt=""/>
                </div>
            </div>
                <div className="car-item">
                    <div className="car-descr">
                        <div className="car-img">
                            <img src={VW} alt=""/>
                        </div>
                        <div className="car-name">
                            <p>2 TEX 2314</p>
                            Черный Passat
                        </div>
                    </div>
                    <div className="about-car">
                        <img src={Back} alt=""/>
                    </div>
                </div>
                <div className="car-item">
                    <div className="car-descr">
                        <div className="car-img">
                            <img src={VW} alt=""/>
                        </div>
                        <div className="car-name">
                            <p>2 TEX 2314</p>
                            Черный Passat
                        </div>
                    </div>
                    <div className="about-car">
                        <img src={Back} alt=""/>
                    </div>
                </div>


            </React.Fragment>
        )


    }

}

export default ChooseCar;