import React , {Component} from 'react';

import './Step.css';
import Back from '../../assets/img/icons/icon3.svg'

class Step extends Component{

    render(){
        return(

            <React.Fragment>
                <div className="steps">
                    <img src={Back} alt=""/>
                    <span>Шаг 1</span>
                    Загрузите фото и заполните профиль
                </div>
                <button className="big-btn" >Далее</button>
            </React.Fragment>
        )


    }

}

export default Step;