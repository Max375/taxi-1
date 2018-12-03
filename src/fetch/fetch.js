import {customConsole, convertCardsInfoFromBackEnd, convertTradesFromBackend, convertOrderInfoFromBackEnd,convertUserInfoFromBackEnd,convertFavoritePointsFromBackEnd, convertDriverInfoFromBackEnd,convertApplicationInfoFromBackEnd} from '../utils';

const URL = 'https://test.kak-pravilno.by/taxi/client_api.php';
const PROXY = 'https://test.kak-pravilno.by/taxi/proxy.php';


export const HTTP_STATUS_USER_INACTIVE = 426;
export const HTTP_STATUS_USER_UNAUTHORIZED = 401;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_OK = 200;


export const smsAuth = function (phone) {

    const body = JSON.stringify({
        action: 'sms_auth',
        data: {
            phone: phone
        }
    });


    customConsole.log('sms_auth request:', JSON.stringify(body));


    return fetch(URL, {
            method: 'POST',
            body: body
        })
        .then(res => {
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data => {
            customConsole.log('sms_auth response:', JSON.stringify(data));
            return data;
        });
};


export const login = function(phone, pin, deviceId){

    const body = JSON.stringify({
        action: 'login',
        device_id: deviceId,
        data: {
            phone: phone,
            pin: pin
        }
    });

    customConsole.log('login request:', JSON.stringify(body));

    return fetch(URL, {
            method: 'POST',
            body: body
        })
        .then(res => {
            if(res.status !== HTTP_STATUS_OK)  throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then((data)=>{
            customConsole.log('login response:', JSON.stringify(data));



            const formatData = {
                order: convertOrderInfoFromBackEnd(data.user_info.order),
                user: convertUserInfoFromBackEnd(data.user_info.info,data.token),
                favoritePoints: convertFavoritePointsFromBackEnd(data.user_info.favorites_points),
                driver: convertDriverInfoFromBackEnd(data.user_info.driver_info),
                application: convertApplicationInfoFromBackEnd(data.user_info.application_info),
                cards: convertCardsInfoFromBackEnd(data.user_info.cards)
            };

            customConsole.log('login response, formatted data:', JSON.stringify(formatData));

            return formatData;
        });
};



export const getUserInfo = function (token) {

    const body = JSON.stringify({
        action: 'get_user_info',
        token: token,
    });

    customConsole.log('getUserInfo request:', JSON.stringify(body));


    return fetch(URL,{
            method: 'POST',
            body: body
        })
        .then((res) =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then((data)=>{
            customConsole.log('getUserInfo response:', JSON.stringify(data));

            const formatData = {
                order: convertOrderInfoFromBackEnd(data.user_info.order),
                user: convertUserInfoFromBackEnd(data.user_info.info,data.token),
                favoritePoints: convertFavoritePointsFromBackEnd(data.user_info.favorites_points),
                driver: convertDriverInfoFromBackEnd(data.user_info.driver_info),
                application: convertApplicationInfoFromBackEnd(data.user_info.application_info),
                cards: convertCardsInfoFromBackEnd(data.user_info.cards)
            };

            customConsole.log('getUserInfo response, formatted data:', JSON.stringify(formatData));

            return formatData;
        });
};


export const registration =  function(phone, name, promocode, deviceId){

    let _body = {
        action: 'registration',
        device_id: deviceId,
        data: {
            phone: phone,
            name: name,
        }
    };

    if (promocode!==null){
        _body.data.promocode = promocode
    }

    const body = JSON.stringify(_body);


    customConsole.log('registration request:', JSON.stringify(body));

    return fetch(URL,{
            method: 'POST',
            body: body
        })
        .then((res) =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data => {
            customConsole.log('registration response:', JSON.stringify(data));
            return data;
        });
};



export const addressAutocomplete = function (input) {


    const body = JSON.stringify({
        data: {
            input: input.trim().replace(/\s/g,'+'),
        }
    });

    customConsole.log('autocomplete request:', JSON.stringify(body));


    return fetch(PROXY,{
            method: 'POST',
            body: body
        })
        .then((res) => {
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('autocomplete response:', JSON.stringify(data));
            return data;
        });
};



export const getDistance = function (startPoint, endPoints, token) {

    const body = JSON.stringify({
        action: 'get_recommended_price',
        token: token,
        data: {
            start_point: startPoint,
            end_points: endPoints
        }
    });

    customConsole.log('get_recommended_price request:', JSON.stringify(body));


    return fetch(URL,{
            method: 'POST',
            body: body
        })
        .then((res) => {
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('get_recommended_price response:', JSON.stringify(data));
            data.price = parseFloat(data.price);
            return data;
        });
};


export const createOrder = function (startPoint, endPoints, price, options, comment,entrance, cardId, token, deviceId) {

    let endPointAddress = [];
    let endPointsLocation = [];

    endPoints.map(el => {
        endPointAddress.push(el.address);
        endPointsLocation.push(el.location);
    });

    const body = JSON.stringify({
        action: 'create_order',
        token: token,
        device_id: deviceId,
        data: {
            start_point: startPoint.location,
            start_point_text: startPoint.address,
            end_points: endPointsLocation,
            end_points_text: endPointAddress,
            price: price,
            comment: comment,
            entrance: entrance,
            options: options,
            card: cardId
        }
    });

    customConsole.log('create order request:', JSON.stringify(body));


    return fetch(URL, {
            method: 'POST',
            body: body
        })
        .then(res => {
            if (res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('create order response:', JSON.stringify(data));
            return data;
        });
};


export const getTradeList = function (token, deviceId) {

    const body = JSON.stringify({
        action: 'get_trade_list',
        token: token,
        device_id: deviceId,
        data: []
    });

    customConsole.log('getTradeList order request:', body);

    return fetch(URL,{
            method: 'POST',
            body: body
        })
        .then((res) => {
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
         })
        .then(data =>{
            customConsole.log('getTradeList order response:', JSON.stringify(data));
            const formatted = convertTradesFromBackend(data.trade_list);
            customConsole.log('getTradeList order formatted response:', JSON.stringify(formatted));
            return formatted;
        });
};


export const cancelOrder = function (token,message) {
     const body = JSON.stringify({
        action: 'cancel_order',
        token: token,
        data: {
            message: message
        }
    });

    customConsole.log('cancelOrder order request:', body);

    return fetch(URL,{
            method: 'POST',
            body: body
        })
        .then((res) =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('cancelOrder order response:', JSON.stringify(data));
            return data;
        });
};

export const cancelTrade = function (orderId, driverId, token) {

    const body = JSON.stringify({
        action: 'skip_one_trade',
        token: token,
        data: {
            order_id: orderId,
            driver_id: driverId
        }
    });


    customConsole.log('cancelTrade request:', body);

    return fetch(URL,{
            method: 'POST',
            body: body
        })
        .then((res)=>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('cancelTrade response:', JSON.stringify(data));
            return data;
        });
};




export const acceptTrade = function (orderId, driverId,token) {

    const body = JSON.stringify({
        action: 'accept_order',
        token: token,
        data: {
            "order_id": orderId,
            "driver_id": driverId
        }
    });

    customConsole.log('acceptTrade request:', body);


    return fetch(URL,{
            method: 'POST',
            body: body
        }).then((res) =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('acceptTrade response:', JSON.stringify(data));
            return data;
        });
};



export const sendTimeToDriver = function (time,token) {

    const body = JSON.stringify({
        action: 'send_time_to_driver',
        token: token,
        data: {
            time: time
        }
    });

    customConsole.log('sendTimeToDriver request:', body);

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'send_time_to_driver',
            token: token,
            data: {
                time: time
            }
        })
    })
        .then(res =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('sendTimeToDriver response:', JSON.stringify(data));
            return data;
        });
};



export const getDriverLocation = function (token) {

    const body = JSON.stringify({
        action: 'get_driver_location',
        token: token
    });

    customConsole.log('get_driver_location request:', body);

    return fetch(URL,{
        method: 'POST',
        body: body
    })
        .then(res =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('get_driver_location response:', JSON.stringify(data));
            return data;
        });
};










export const getStreet = function (street, token, deviceId) {
    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'select_address',
            token: token,
            device_id: deviceId,
            data: {
                street: street
            }
        })
    })
};



export const getRacesHistory = function (page, token) {
    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'get_races_history',
            token: token,
            data: {
                page: page
            }
        })
    })
        .then(res =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('get_races_history response:', JSON.stringify(data));
            return data;
        });
};



export const getFinishInfo = (token)=>{
    const body = JSON.stringify({
        action: 'get_finish_ride_info',
        token: token
    });

    customConsole.log('get_finish_ride_info request:', body);

    return fetch(URL,{
        method: 'POST',
        body: body
    })
        .then(res =>{
            if(res.status !== HTTP_STATUS_OK) throw {status: res.status, error: res.text()};
            return res.json();
        })
        .then(data =>{
            customConsole.log('get_finish_ride_info response:', JSON.stringify(data));
            let foramttedData = {
                bonusPayment: parseFloat(data.bonus_payment),
                totalPayment: parseFloat(data.total_payment),
                time: parseFloat(data.travel_time),
                distance: (parseInt(data.order_distance)/1000).toFixed(0)
            };
            customConsole.log('get_finish_ride_info formatted response:', JSON.stringify(foramttedData));
            return foramttedData;
        });
};



export const usePromocode = function (promocode,token) {
    console.log('================ addPromocode REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'add_bonus',
        token: token,
        data: {
            promocode: promocode
        }
    }));
    console.log('================ addPromocode REQUEST ===============');

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'add_bonus',
            token: token,
            data: {
                promocode: promocode
            }
        })
    }).then(res =>{
        if(res.status !== HTTP_STATUS_OK) return Promise.reject(res.text());

        return res.json();
    })
};

export const invite_exist = function (invite) {
    console.log('================ send_time_to_driver REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'invite_exist',
        data: {
            invite: invite
        }
    }));
    console.log('================ send_time_to_driver REQUEST ===============');

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'invite_exist',
            data: {
                invite: invite
            }
        })
    }).then(res =>{
        if(res.status !== HTTP_STATUS_OK) return Promise.reject(res.text());

        return res.json();
    })

};




export const setRating = function (orderId, rating, token) {

    console.log('================ setRating REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'estimate_order',
        token: token,
        data: {
            rating: rating,
            order_id: orderId,
            comment: ''
        }
    }));
    console.log('================ setRating REQUEST ===============');


    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'estimate_order',
            token: token,
            data: {
                rating: rating,
                order_id: orderId,
                comment: ''
            }
        })
    }).then(res=>{
        if (res.status !== HTTP_STATUS_OK) return Promise.reject(res.text());
        return res.status;
    })
};
