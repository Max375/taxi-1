import React, {Component} from 'react';
import './Load.css';
import loadingLogo from '../../assets/img/loading_logo.png';

function Load() {

    return (
        <div className={'loading container'}>
            <div className={'logo-loading'}>
                <img src={loadingLogo} alt=""/>
            </div>

            <div className="spinner-wrapper">
                <div className="lds-default">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
export default Load;