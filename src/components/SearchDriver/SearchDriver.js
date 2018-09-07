import React , {Component} from 'react';

import './SearchDriver.css';
import LoadImage from '../../assets/img/load.gif'
import BackBtn from '../../assets/img/icons/button.svg'
import changeScreenAction from "../../actions/changeScreenAction";
import Order from "../Order/Order";

import {cancelOrder} from "../../fetch/fetch";
import connect from "react-redux/es/connect/connect";




class SearchDriver extends Component {


    componentDidMount(){
        window.FCMPlugin.onNotification(function(data){
            alert(JSON.stringify(data));
        });
    }


    render(){
        return(
            <React.Fragment>

                <div className="search">Поиск водителя</div>
                <div className="load">
                    <img src={LoadImage} alt=""/>
                </div>
                <div className="back" onClick={() =>{
                    cancelOrder(this.props.token).then((res)=>{
                        if (res === true) this.props.dispatch(changeScreenAction(<Order/>));
                        else {
                            console.log('CANCELED ORDER FETCH FAILED');
                        }
                    });
                }}>
                    <img src={BackBtn} alt=""/>
                </div>


            </React.Fragment>
        )
    }

}


const mapStateToProps = (state) => {
    return state.user;
};

export default connect(mapStateToProps)(SearchDriver);