import React , {Component} from 'react';

import './DriverRegistration.css';
import Back from '../../assets/img/icons/icon3.svg'
import Step from '../Step/Step'
import Photo from '../../assets/img/photo.png'
class DriverRegistration extends Component{

    render(){
        return(

            <React.Fragment>
                <Step/>
                <div className="photo">
                    <button><img src={Photo} alt=""/></button>
                </div>
                <input className="drivername" type="text" placeholder="Имя"/>
            </React.Fragment>
        )


    }

}

export default DriverRegistration;