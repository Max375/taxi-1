import React , {Component} from 'react';

import './DriverRoad.css';
import connect from "react-redux/es/connect/connect";
import OrderedCarInfo from '../OrderedCarInfo/OrderedCarInfo'
import HeaderWithMenu from "../../HeaderWithMenu/HeaderWithMenu";
import RoadMap from '../../Maps/RoadMap'
import CancelOrderMenu from '../CancelOrderMenu/CancelOrderMenu';
import {updateDriverLocation} from "../../../utils";

class DriverRoad extends Component{

    state = {
        isCancelOrderMenuOpen: false,
        interval: null,
    };

    interval=null;

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

    componentDidMount(){
        this.interval = setInterval(updateDriverLocation, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
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