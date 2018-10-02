import React from 'react';
import { combineReducers } from 'redux'
import Load from '../components/Load/Load';

import user from './userReducer';
import app from  './appReducer';
import order from  './orderReducer';
import favoritePoints from './favoritePointsReducer';
import push from './pushReducer';
import driver from './driverReducer'


const initialState = {
    app: {
        currentScreen: <Load/>
    },
    user: {
        token: localStorage.getItem('token')|| null,
    }
};


export default combineReducers({
    app,
    user,
    order,
    favoritePoints,
    push,
    driver
})


