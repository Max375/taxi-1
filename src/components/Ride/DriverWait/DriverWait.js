import React , {Component} from 'react';

import './DriverWait.css';
import connect from "react-redux/es/connect/connect";
import HeaderWithMenu from "../../HeaderWithMenu/HeaderWithMenu";
import WaitMap from '../../Maps/WaitMap'
import {getDriverLocation, getUserInfo} from '../../../fetch/fetch'
import setDriverLocationAction from "../../../actions/driverActions/setDriverLocationAction";
import CancelOrderMenu from '../CancelOrderMenu/CancelOrderMenu';
import {doSync, setUserInfo} from "../../../secondary";
import {carModelCheck, customConsole} from "../../../utils";
import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../../Authorization/Login/Login";
import clearTokenAction from "../../../actions/clearTokenAction";
import Expectation from "../Expectation/Expectation";

class DriverRoad extends Component{

    state = {
        isCancelOrderMenuOpen: false,
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

    render(){


        return(
            <div className="waiting-for-taxi container without-footer">
                <HeaderWithMenu headerTitle={'Ожидание такси'}/>
                <div className="calc-content without-footer container-with-bg-map">
                    <WaitMap location={this.props.driver !== null && this.props.driver.location}/>
                    <Expectation openMenu={this.openMenuCancel}/>
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