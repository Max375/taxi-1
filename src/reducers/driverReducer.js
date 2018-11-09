import {SET_DRIVER_INFO,CLEAR_DRIVER_INFO} from '../actions/actionList';
import React from "react";

const initialState = {
    location: null,
    rating: 0,
    phone: null,
    car: {
        color: null,
        version: null,
        year: null,
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
                car:{
                    color: action.payload.car.color,
                    version: action.payload.car.version,
                    year: action.payload.car.year,
                    colorCode: action.payload.car.colorCode,
                    model: action.payload.car.model
                }
            };
        }
        case CLEAR_DRIVER_INFO:
        {
            return initialState;
        }
        default:
            return state;
    }
}