import React from 'react';
import './TransparentButton.css';

function TransparentButton(props){
        return (<button onClick={props.onClick} className={'transparent-button'}>{props.nameButton}</button>);
}
export default TransparentButton;