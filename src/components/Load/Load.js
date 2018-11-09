import React, { Component } from 'react';

import LoadImg from '../../assets/img/load.gif';

export default function Load(){

    return (
            <div class="load">
                <img class="animated infinite flash" src={LoadImg} />
</div>
        );
}