import VW from '../../../assets/img/vw.png'
import BMW from '../../../assets/img/bmw.png'
import React from "react";


export default function DriverOffer(props) {

    let touchStartPosition = 0;
    let touchEndPosition = 0;

    const touchStartHandler = (e)=>{
        touchStartPosition = e.touches[0].clientX;
        touchEndPosition = e.touches[0].clientX;
    };

    const touchMoveHandler = (e) => {
        e.currentTarget.style.transform = `translateX(${e.touches[0].clientX-touchStartPosition }px)`;
        touchEndPosition = e.touches[0].clientX;
    };

    const touchEndHandler = (e) =>{

        if (Math.abs(touchStartPosition-touchEndPosition)>200){
                console.log(Math.abs(touchStartPosition-touchEndPosition));
                console.log(touchStartPosition);
                console.log(touchEndPosition);
                props.cancelTrade(props.offer.orderId, props.offer.driverId);

                const el = e.currentTarget;

                el.style.transition = `transform 0.15s ease`;
                el.style.transform = `translateX(${-window.innerWidth}px)`;
                setTimeout(() => {
                    el.style.height = 0;
                    el.style.marginTop = 0;
                    el.style.padding = 0;
                }, 150)
        }
        else{
            e.currentTarget.style.transform = `translateX(0px)`;
        }
    };


    let car_image = (<img src={VW} alt=""/>);

    switch(props.offer.carModel) {
        case 'VW':
            car_image = (<img src={VW} alt=""/>);
            break;
        case 'BMW':
            car_image = (<img src={BMW} alt=""/>);
            break;
    }

    console.log(props,'offer props');
    return (
        <div className="driver-wrapper" onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler} onTouchEnd={touchEndHandler}>
            <div className="run-line"></div>
            <div className="flex-wrapp">
                <div className="driver-info">
                    <div className="driver-img">
                        {car_image}
                    </div>
                    <div class="driver-name">
                        <p>{props.offer.carVersion}</p>
                        <i className="fa fa-star" aria-hidden="true"></i>{props.offer.rating} / {props.offer.carYear} г
                    </div>
                </div>
                <div className="car-info">
                    <div className="kilometers">
                        <p>{props.offer.time} мин</p>
                    </div>
                    <div className="price">{props.offer.price}р</div>
                </div>
            </div>


            <div className="driver-buttons">
                <button onClick={props.acceptTrade}>Принять</button>
            </div>
        </div>
    )
}