import React from 'react';
import './AddressButton.css';

function AddressButton(props){
        return (
            <button onClick={props.onClick} className={'data-button'}>
                <div className="title">{props.title}</div>
                <div className="main-text">{props.mainText}</div>
            </button>
        );
}
export default AddressButton;