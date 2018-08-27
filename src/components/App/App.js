import React, { Component } from 'react';
import './App.css';


import Login from '../Login/Login'
import Load from '../Load/Load'
import Order from '../Order/Order'


import {connect} from 'react-redux'

import changeScreenAction from "../../actions/changeScreenAction";
import Registration from "../Registration/Registration";

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.user.token === null) this.props.dispatch(changeScreenAction(<Order />));
    }

    render() {
        return this.props.app.currentScreen || <Login />;
    }
}

const mapStateToProps = (state) => {
    return state;
};

    

export default connect(mapStateToProps)(App)
