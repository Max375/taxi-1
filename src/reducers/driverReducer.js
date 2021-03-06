import {SET_DRIVER_INFO,CLEAR_DRIVER_INFO,SET_DRIVER_LOCATION} from '../actions/driverActions/driverActions';
import React from "react";

const initialState = {
    location: null,
    rating: 0,
    phone: null,
    name: '',
    car: {
        color: null,
        version: null,
        year: null,
        colorCode: "#ffffff",
        model: 'BMW',
        carNumber: null
    }
};

export default function driver(state = initialState , action) {
    switch (action.type) {
        case SET_DRIVER_INFO:
        {
            if (action.payload === null) return initialState;

            return {
                ...state,
                location: action.payload.location,
                rating: action.payload.rating,
                phone: action.payload.phone,
                name: action.payload.name,
                car:{
                    color: action.payload.car.color,
                    version: action.payload.car.version,
                    year: action.payload.car.year,
                    colorCode: action.payload.car.colorCode,
                    model: action.payload.car.model,
                    carNumber: action.payload.car.carNumber
                }
            };
        }
        case CLEAR_DRIVER_INFO:
        {
            return initialState;
        }
        case SET_DRIVER_LOCATION:
        {
            return {
                ...state,
                location: action.payload.location
            }
        }
        default:
            return state;
    }
}