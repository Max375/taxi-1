import React from 'react';
import './Back.css';

import changeScreenAction from "../../actions/changeScreenAction";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";


function Back(props) {

    function _onClick() {
        if (props.screen === 'Login')  props.dispatch(changeScreenAction(<Login/>));
        else props.dispatch(changeScreenAction(<Registration/>));
    }

    return (
        <div onClick={_onClick} className="back-button">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
        </div>
    )
}

export default Back;