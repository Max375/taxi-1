import React , {Component} from 'react';

import './SearchDriver.css';
import TopBar from "../TopBar/TopBar";
import LoadImage from '../../assets/img/load.gif'
import BackBtn from '../../assets/img/icons/button.svg'
class SearchDriver extends Component{

    render(){
        return(
            <React.Fragment>

                    <div className="search">Поиск водителя</div>
                    <div className="load">
                        <img src={LoadImage} alt=""/>
                    </div>
                    <div className="back">
                        <img src={BackBtn} alt=""/>
                    </div>


            </React.Fragment>
                )


    }

}

export default SearchDriver;