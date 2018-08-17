import React, { Component } from 'react';
import './Logo.css';

import LogoImage from  './Logo.png';


export default function Logo(){

    return (
        <div className="logo">
            <img src={LogoImage} alt="Blitz" />
                <p>здесь должен быть слоган</p>
        </div>
    );
}