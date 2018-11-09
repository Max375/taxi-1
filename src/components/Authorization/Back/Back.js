import React from 'react';
import './Back.css';

import changeScreenAction from "../../../actions/changeScreenAction";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import connect from "react-redux/es/connect/connect";


function Back(props) {

    function onClick() {
        if (props.screen === 'Login')  props.dispatch(changeScreenAction(<Login/>));
        else props.dispatch(changeScreenAction(<Registration/>));
    }

    return (
        <div onClick={onClick} class="back-button">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
        </div>
    )
}


export default connect()(Back);