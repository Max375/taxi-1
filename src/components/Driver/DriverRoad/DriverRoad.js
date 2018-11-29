import React , {Component} from 'react';

import './DriverRoad.css';
import connect from "react-redux/es/connect/connect";
import OrderedCarInfo from '../OrderedCarInfo/OrderedCarInfo'
import HeaderWithMenu from "../../HeaderWithMenu/HeaderWithMenu";
import RoadMap from '../Maps/RoadMap'
import {getDriverLocation, getUserInfo} from '../../../fetch/fetch'
import setDriverLocationAction from "../../../actions/driverActions/setDriverLocationAction";
import CancelOrderMenu from '../CancelOrderMenu/CancelOrderMenu';
import {doSync, setUserInfo, store} from "../../../secondary";
import {customConsole} from "../../../utils";
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../../Authorization/Login/Login";
import clearTokenAction from "../../../actions/clearTokenAction";

class DriverRoad extends Component{

    state = {
        isCancelOrderMenuOpen: false,
        interval: null,
    };

    closeMenuCancel = () =>{
        this.setState({
            isCancelOrderMenuOpen: false
        });
    };


    openMenuCancel = () => {
        this.setState({
            isCancelOrderMenuOpen: true
        });
    };


    updateDriverLocation =()=>{
        getDriverLocation(this.props.user.token)
            .then(data=>{
                console.log(data);
                this.props.dispatch(setDriverLocationAction(data.location));
                if(parseInt(data.status) !== 3){
                    getUserInfo(this.props.user.token)
                        .then(data => {
                            setUserInfo(data);
                            doSync();
                        })
                        .catch(err => {
                            customConsole.error(err);
                            this.props.dispatch(changeScreenAction(<Login />));
                            this.props.dispatch(clearTokenAction());
                        });
                }
            })
            .catch(()=>{

            })
    };


    componentDidMount(){
        this.setState({interval : setInterval(this.updateDriverLocation, 1000)});
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    render(){

        return(
                <div className="waiting-for-taxi container">
                    <HeaderWithMenu headerTitle={'Ожидание такси'}/>
                    <div className="calc-content without-footer container-with-bg-map">
                        <RoadMap />
                        <OrderedCarInfo openMenu={this.openMenuCancel} />
                    </div>
                    <CancelOrderMenu token={this.props.user.token} closeMenu={this.closeMenuCancel} isVisible={this.state.isCancelOrderMenuOpen} />
                </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        driver: state.driver
    };
};

export default connect(mapStateToProps)(DriverRoad);