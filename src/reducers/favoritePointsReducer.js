import {SET_FAVORITES_POINTS} from '../actions/actionList';
import React from "react";

const initialState = {
    points: null,
};

export default function favoritePoints(state = initialState , action) {
    switch (action.type) {
        case SET_FAVORITES_POINTS:
        {
            return {
                ...state,
                points: action.payload.points
            };
        }
        default:
            return state;
    }
}