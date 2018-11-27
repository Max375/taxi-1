import React from 'react';
import { combineReducers } from 'redux'
import user from './userReducer';
import app from  './appReducer';
import order from  './orderReducer';
import favoritePoints from './favoritePointsReducer';
import push from './pushReducer';
import driver from './driverReducer'
import trades from './tradesReducer'
import cards from './cardsReducer'

export default combineReducers({
    app,
    user,
    order,
    favoritePoints,
    push,
    driver,
    trades,
    cards
})


