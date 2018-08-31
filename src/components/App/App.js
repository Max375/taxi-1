import React, { Component } from 'react';
import './App.css';


import Load from '../Load/Load'





import {connect} from 'react-redux'


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return this.props.app.currentScreen===null ? <Load/> : this.props.app.currentScreen;
    }
}

const mapStateToProps = (state) => {
    return state;
};

    

export default connect(mapStateToProps)(App)
