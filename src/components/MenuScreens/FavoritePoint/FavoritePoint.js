import React, { Component } from 'react';


export default  function FavoritePoint(props) {
    return(
        <div>
            <div>Удалить</div>
            <div>{props.title}</div>
            <div>{props.address}</div>
        </div>
    )
}