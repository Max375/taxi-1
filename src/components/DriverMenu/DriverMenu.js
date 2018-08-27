import React , {Component} from 'react';

import './DriverMenu.css';
import Step from '../Step/Step'
import Face from '../../assets/img/face.png'
import Dots from '../../assets/img/dots.svg'
class DriverMenu extends Component{

    render(){
        return(

            <React.Fragment>
                <div className="driver-menu">
                    <div className="driver-photo">
                        <img src={Face} alt=""/>
                    </div>
                    <div className="off">
                        <i className="fa fa-power-off" aria-hidden="true"></i>
                    </div>
                    <div className="status active">
                        Заказы
                    </div>
                    <div className="dots">
                        <img src={Dots} alt=""/>
                    </div>
                </div>

            </React.Fragment>
        )


    }

}

export default DriverMenu;