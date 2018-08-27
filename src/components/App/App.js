import React, { Component } from 'react';
import './App.css';


import Login from '../Login/Login'
import Load from '../Load/Load'
import Order from '../Order/Order'


import SearchDriver from '../SearchDriver/SearchDriver'
import Price from '../Price/Price'
import Driver from '../Driver/Driver'
import Road from '../Road/Road'
import Total from '../Total/Total'
import OrderOptions from '../OrderOptions/OrderOptions'
import EnterPin from '../EnterPin/EnterPin'
import Registration from '../Registration/Registration'
import Map from '../Map/Map'
import Step from "../Step/Step"
import DriverRegistration from "../DriverRegistration/DriverRegistration";


import {connect} from 'react-redux'

import changeScreenAction from "../../actions/changeScreenAction";
import DriverPin from "../DriverPin/DriverPin";
import EnterDriverPin from "../EnterDriverPin/EnterDriverPin";
import ChooseCar from "../ChooseCar/ChooseCar";
import AboutCar from "../AboutCar/AboutCar";
import DriverMenu from "../DriverMenu/DriverMenu";
import DriverOrders from "../DriverOrders/DriverOrders";



class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.user.token === null) this.props.dispatch(changeScreenAction(<Login />));
    }

    render() {
        return this.props.app.currentScreen || <Login />;
    }
}

const mapStateToProps = (state) => {
    return state;
};

    

export default connect(mapStateToProps)(App)
