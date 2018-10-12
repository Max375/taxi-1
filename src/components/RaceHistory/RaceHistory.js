import BMW from "../../assets/img/bmw.png";
import React from "react";



export default class RaceHistory extends React.Component{

    render(){
        return (
            <div className="order-items-wp">
                <div className="order-item">

                    <div className="flex-wp">
                        <div className="address">

                        </div>
                        <div className="time-wp">
                            <span className="distance">5,2 км</span>
                            <span className="time">12:50</span>
                        </div>
                        <div className="price">
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