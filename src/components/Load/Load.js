import React, { Component } from 'react';
import loadImage from './Logo.gif';
import './Load.css';

export default function Load(){

    return (
            <div className="load">
                <img className="animated infinite flash" src={loadImage} />
			</div>
        );
}