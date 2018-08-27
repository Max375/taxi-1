import React , {Component} from 'react';

import './AboutCar.css';
import Step from '../Step/Step'
import VW from '../../assets/img/vw.png'
class AboutCar extends Component{

    render(){
        return(

            <React.Fragment>
                <Step/>
                <div className="about-car">
                    <div className="car-inform">
                        <div className="car-img">
                            <img src={VW} alt=""/>
                        </div>
                        <div className="car-name">
                            Passat <br/>
                            B6 <br/>
                            2 TEX 2314
                        </div>
                    </div>
                    <div className="car-descr">
                        <p>Особенности</p>
                        Каждый из нас понимает очевидную вещь: семантический разбор внешних противодействий влечет за собой процесс внедрения и модернизации новых принципов формирования материально-технической и кадровой базы.  верифицированы.
                    </div>
                </div>

            </React.Fragment>
        )


    }

}

export default AboutCar;