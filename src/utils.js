import React from "react";
import {doSync, setUserInfo, store} from "./secondary";
import VW from './assets/img/sign_hyundai_big.png'
import BMW from './assets/img/sign_hyundai_big.png'
import {getDriverLocation, getUserInfo} from "./fetch/fetch";
import setDriverLocationAction from "./actions/driverActions/setDriverLocationAction";
import changeScreenAction from "./actions/changeScreenAction";
import Login from "./components/Authorization/Login/Login";
import clearTokenAction from "./actions/clearTokenAction";
const isDebug = true;

export const PRICE_STAP = 0.5;

export const customConsole = {
    log: (...args) => {
        if (isDebug){
            let output = Array.from(args);
            output.unshift('[BLITZ_TAXI] ');
            console.log(output.join(' '));
        }
    },
    error: (...args) => {
        if (isDebug){
            let output = Array.from(args);
            output.unshift('[BLITZ_TAXI] ');
            console.log(output.join(' '));
        }
    }
};


export const logStoreState = () => {
    const state = store.getState();

    customConsole.log('LogStoreState store state ', JSON.stringify(state));
};

export const convertOrderInfoFromBackEnd = (data) => {
    if (data === null) return null;

    let wayPoint = null;
    let endPoint = null;

    if(data.end_points.length >1){
        wayPoint = {
            address: data.end_points_text[0],
            location: {
                lat: parseFloat(data.end_points[0].lat),
                lon: parseFloat(data.end_points[0].lon)
            }
        };

        endPoint = {
            address: data.end_points_text[1],
                location: {
                    lat: parseFloat(data.end_points[1].lat),
                    lon: parseFloat(data.end_points[1].lon)
                }
        }
    }
    else{
        endPoint = {
            address: data.end_points_text[0],
            location: {
                lat: parseFloat(data.end_points[0].lat),
                lon: parseFloat(data.end_points[0].lon)
            }
        }
    }

    return {
        id: data.id,
        entrance: parseInt(data.entrance,10),
        status: parseInt(data.status,10),
        comment: data.comment,
        price: parseFloat(data.price),
        card: parseInt(data.card),


        startPoint: {
            address: data.start_point_text,
            location: {
                lat: parseFloat(data.start_point.lat),
                lon: parseFloat(data.start_point.lon)
            }
        },



        endPoint: endPoint,
        wayPoint: wayPoint,

        options: {
            smoking : data.options.smoking,
            gender : data.options.gender,
            english : data.options.english,
            babySeat : data.options.babySeat,
            dogPlace : data.options.dogPlace,
            numberSeats : data.options.numberSeats,
            carType : data.options.carType,
            terminal : data.options.terminal,
            ads : data.options.ads,
            baggage : data.options.baggage
        }
    }

};


export const convertUserInfoFromBackEnd = (data, token) => {
    return  {
        name: data.name,
        phone: parseInt(data.phone),
        image: data.image,
        email: data.email,
        bonus: parseFloat(data.bonus),
        numTrip: parseInt(data.num_trip),
        distance: parseFloat(data.distance),
        promocode: data.promocode,
        token: token
    }
};


export const convertFavoritePointsFromBackEnd = (data) => {
    console.log(data);
    return data.map(el=>{
        return {
            id: parseInt(el.id),
            title: el.title,
            address: el.location_text,
            location: {
                lat: parseFloat(el.location.lat),
                lon: parseFloat(el.location.lon)
            }
        }
    });
};


export const convertDriverInfoFromBackEnd = (data) => {
    if (data === null) return null;
    return{
        location: {
            lat: parseFloat(data.location.lat),
            lon: parseFloat(data.location.lon)
        },
        rating: parseInt(data.rating),
        phone: parseInt(data.phone),
        name: data.name,
        car: {
            color: data.car.color,
            version: data.car.version,
            colorCode: data.car.color_code,
            year: parseInt(data.car.year),
            model: data.car.model,
            carNumber: data.car.car_number
        }
    }
};


export const convertApplicationInfoFromBackEnd = (data) => {
    if (data === null) return null;
    return{
        minimalPrice: parseInt(data.min_price,10)
    }
};


export const convertCardsInfoFromBackEnd = (data) => {
    return data.map(el=>{
        return {
            id: parseInt(el.id),
            lastDigits: el.card_last_digits,
            brand: el.card_brand,
        }
    });
};


export const  convertTradesFromBackend = (data) =>{
    return data.map(el=>{
       return {
           id: parseInt(el.id),
           price: parseFloat(el.price),
           driverId: parseInt(el.driver_id),
           rating: parseInt(el.rating),
           orderId: parseInt(el.order_id),
           carModel: el.admin_car_models_name,
           carYear: parseInt(el.car_year),
           carVersion: el.car_version,
           time: parseInt(el.time_to_client),
       }
    });
};


export const validateNumber = (number) =>{
    const regexp = /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
    return number.search(regexp) !== -1;
};

export const  validateName = (name)=>{
    const regexp = /^[а-яА-ЯёЁ]+$/;
    return name.search(regexp) !== -1;
};


export const throttle = (func, ms) => {

    var isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {

        if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments); // (1)

        isThrottled = true;

        setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }

    return wrapper;
};


export const debounce = (func, ms) => {

    let timer = null;

    return function (...args) {
        const onComplete = () => {
            func.apply(this, args);
            timer = null;
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(onComplete, ms);
    };
};


export const carModelCheck = (carModel)=>{
    switch(carModel) {
        case 'VW':
            return (<img src={VW} alt=""/>);
        case 'BMW':
            return (<img src={BMW} alt=""/>);
        default:
            return (<img src={BMW} alt=""/>);
    }
};

export const isEnterPressed = (e) => {
        let kCd = e.keyCode || e.which;
        if (kCd === 0 || kCd === 229) {
            kCd = this.value.charCodeAt(this.value.length - 1);
        }

        if(kCd === 13) return true;

        return false;
};


export function collapseSection(element) {
    if (!element) return;
    let sectionHeight = element.scrollHeight;

    let elementTransition = element.style.transition;
    element.style.transition = '';

    requestAnimationFrame(function() {
        element.style.height = sectionHeight + 'px';
        element.style.transition = elementTransition;

        requestAnimationFrame(function() {
            element.style.height = 0 + 'px';
        });
    });
}


export  function expandSection(element) {
    if (!element) return;

    let sectionHeight = element.scrollHeight;


    function expandSectionListener(){
        element.removeEventListener('transitionend', expandSectionListener);
        element.classList.remove('task-block--close');
        element.style.height = 'auto';
    }


    element.style.height = sectionHeight + 'px';

    element.addEventListener('transitionend', expandSectionListener);
}



export const rad = function(x) {
    return x * Math.PI / 180;
};

export const getDistanceBetweenToPoints = function(p1, p2) {
    console.log(p1,p2);
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = rad(p2.lat - p1.lat);
    const  dLon = rad(p2.lon - p1.lon);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return (d/1000).toFixed(0);
};



export const updateDriverLocation =()=>{
    getDriverLocation(store.getState().user.token)
        .then(data=>{
            store.dispatch(setDriverLocationAction(data.location));
            if(parseInt(data.status) !== store.getState().order.status){
                getUserInfo(store.getState().user.token)
                    .then(data => {
                        setUserInfo(data);
                        doSync();
                    })
                    .catch(err => {
                        customConsole.error(err);
                        store.dispatch(changeScreenAction(<Login />));
                        store.dispatch(clearTokenAction());
                    });
            }
        })
        .catch(()=>{

        })
};