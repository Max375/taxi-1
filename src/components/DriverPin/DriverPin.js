import React , {Component} from 'react';

import './DriverPin.css';
import Back from '../../assets/img/icons/icon3.svg'
import Step from '../Step/Step'
import Photo from '../../assets/img/photo.png'
class DriverPin extends Component{

    render(){
        return(

            <React.Fragment>
                <Step/>
                <div className="center-wp">
                    <div className="enter-pin">
                        <span>Введите ваш номер телефона</span>
                        На этот номер мы вышлем вам SMS <br/>со специальным кодом
                        <input type="text" placeholder="Номер телефона"/>
                    </div>
                </div>
            </React.Fragment>
        )


    }

}

export default DriverPin;