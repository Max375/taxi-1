import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import './Races.css';
import RaceMap from  '../../Maps/RaceMap';
import HeaderWithMenu from "../../HeaderWithMenu/HeaderWithMenu";
import DriverInfo from "../DriverInfo/DriverInfo"
import {updateDriverLocation} from '../../../utils'


class Races extends Component {


    interval = null;

    componentDidMount(){
        this.interval = setInterval(updateDriverLocation, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    render(){


        return (
            <div className="riding container">
                <HeaderWithMenu headerTitle={'Поездка'}/>
                <div className="calc-content without-footer">
                    <RaceMap location={this.props.driver !== null && this.props.driver.location} />
                    <DriverInfo />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order,
        driver: state.driver,
    };
};

export default connect(mapStateToProps)(Races);
