import React, { Component } from 'react';


export default  function FavoritePoint(props) {
    console.log(props);
    return(
        <div>
            <div>Удалить</div>
            <div>{props.title}</div>
            <div>{props.location_text}</div>
        </div>
    )
}