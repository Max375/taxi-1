import React, { Component } from 'react';

import LoadImg from '../../assets/img/load.gif';

export default function Load(){

    return (
            <div className="load">
                <img className="animated infinite flash" src={LoadImg} />
</div>
        );
}