import React , {Component} from 'react';

import './EnterDriverPin.css';
import Back from '../../assets/img/icons/icon3.svg'
import Step from '../Step/Step'
import Photo from '../../assets/img/photo.png'
class EnterDriverPin extends Component{

    render(){
        return(

            <React.Fragment>
                <Step/>
                <div className="center-wp">
                    <div className="enter-pin">
                        <span>Введите код из SMS сообщения</span>
                        Он должен придти на ваш телефон<br/>в течении нескольких минут
                    </div>
                    <div className="input-numbers">
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>
                        <input type="text"/>

                    </div>
                </div>

                <button className="big-btn" >Далее</button>


            </React.Fragment>
        )


    }

}

export default EnterDriverPin;