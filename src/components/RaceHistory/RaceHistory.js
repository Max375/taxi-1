import BMW from "../../assets/img/bmw.png";
import React from "react";



export default class RaceHistory extends React.Component{

    render(){
        return (
            <div class="order-items-wp">
                <div class="order-item">

                    <div class="flex-wp">
                        <div class="address">

                        </div>
                        <div class="time-wp">
                            <span class="distance">5,2 км</span>
                            <span class="time">12:50</span>
                        </div>
                        <div class="price">
                            2 р
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

/*
                           <p>{props.data.start_point_text}</p>
                           {props.data.end_points_text.map(el=>{
                               return <p>{el}</p>
                           })}
                            */