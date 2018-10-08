const URL = 'https://test.kak-pravilno.by/taxi/client_api.php';
const PROXY = 'https://test.kak-pravilno.by/taxi/proxy.php';


export const HTTP_STATUS_USER_INACTIVE = 426;
export const HTTP_STATUS_USER_UNAUTHORIZED = 401;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_OK = 200;


export const loginUser = function (phone) {

    console.log('================ loginUser REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'login',
        data: {
            phone: phone
        }
    }));
    console.log('================ loginUser REQUEST ===============');

    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'login',
            data: {
                phone: phone
            }
        })
    }).then((res) =>{
        if(res.status === HTTP_STATUS_BAD_REQUEST) return false;
        return true;
    });
};


export const sendPin = function(phone, pin, deviceId){
    console.log('================ sendPin REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'sms_auth',
        device_id: deviceId,
        data: {
            phone: phone,
            pin: pin
        }
    }));
    console.log('================ sendPin REQUEST ===============');

    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'sms_auth',
            device_id: deviceId,
            data: {
                phone: phone,
                pin: pin
            }
        })
    })
        .then((res) =>{
            console.log(res.status,'sendPin status');
            if(res.status === HTTP_STATUS_BAD_REQUEST)  return Promise.reject(res.text());
            return res.json();
        })
        .then((data)=>{
            if ( data.user_info.order!==null){


                    data.user_info.order =  {
                        clientId: data.user_info.order.client_id,
                        driverId: data.user_info.order.driver_id,
                        id: data.user_info.order.id,
                        entrance: data.user_info.order.entrance,
                        status: parseInt(data.user_info.order.status,10),
                        comment: data.user_info.order.comment,
                        price: data.user_info.order.price,


                        startPoint: {
                            label: data.user_info.order.start_point_text,
                            value: {
                                lat: data.user_info.order.start_point.lat,
                                lon: data.user_info.order.start_point.lon
                            }
                        },


                        endPoints: data.user_info.order.end_points.map((el, index)=> {
                            return {
                                label: data.user_info.order.end_points_text[index],
                                value: {
                                    lat: el.lat,
                                    lon: el.lon
                                }
                            }
                        }),
                    };


            }

            return data;
        });
};

export const getTradeList = function (token, deviceId) {
    console.log('================ getTradeList REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'get_trade_list',
        token: token,
        device_id: deviceId,
        data: []
    }));
    console.log('================ getTradeList REQUEST ===============');

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'get_trade_list',
            token: token,
            device_id: deviceId,
            data: []
        })
    }).then((res) => {
        if(res.status === HTTP_STATUS_OK) return res.json();
        else{
            console.log("=========== GET TRADE LIST FAILED =============== ");
            return null;
        }
    })
};

export const createOrder = function (startPoint, startPointText, endPoints, endPointsText, price, options, token, deviceId,comment,entrance) {
    console.log('================ createOrder REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'create_order',
        token: token,
        device_id: deviceId,
        data: {
            start_point: startPoint,
            start_point_text: startPointText,
            end_points: endPoints,
            end_points_text: endPointsText,
            price: price,
            comment: comment,
            entrance: entrance,
            options: options
        }
    }));
    console.log('================ createOrder REQUEST ===============');

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'create_order',
            token: token,
            device_id: deviceId,
            data: {
                start_point: startPoint,
                start_point_text: startPointText,
                end_points: endPoints,
                end_points_text: endPointsText,
                price: price,
                comment: comment,
                entrance: parseInt(entrance),
                options: {
                    key: 'value',
                }
            }
        })
    }).then(res => {
        console.log(res.status);
        if (res.status === HTTP_STATUS_OK) return true;
        return false;
    })
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


export const getDistance = function (data, token, deviceId) {
    return fetch(URL,{
        method: 'POST',
        device_id: deviceId,
        body: JSON.stringify({
            action: 'get_recommended_price',
            token: token,
            data: data,
            options: {
                "key": "value"
            }
        })
    })
};


export const regUser =  function(phone, name){
    console.log('================ reg REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'registration',
        data: {
            phone: phone,
            name: name,
        }
    }));
    console.log('================ reg REQUEST ===============');

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'registration',
            data: {
                phone: phone,
                name: name,
            }
        })
    }).then((res) =>{
        if(res.status === HTTP_STATUS_BAD_REQUEST) return false;
        return true;
    });
};


export const acceptOrder = function (orderId, driverId,token) {

    console.log('================ accept_order REQUEST ===============');
    console.log('body: ', JSON.stringify({
            action: 'accept_order',
            token: token,
            data: {
                "order_id": orderId,
                "driver_id": driverId
            }
        })
        );
    console.log('================ accept_order REQUEST ===============');

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'accept_order',
            token: token,
            data: {
                "order_id": orderId,
                "driver_id": driverId
            }
        })
    }).then((res) =>{
        console.log(res.status);
        if(res.status === HTTP_STATUS_BAD_REQUEST) return false;
        return res.json();
    });
};


export const cancelOrder = function (token,message) {
    console.log(token,message);
    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'cancel_order',
            token: token,
            data: {
                message: message
            }
        })
    }).then((res) =>{
        if(res.status === HTTP_STATUS_BAD_REQUEST) return false;
        return true;
    });
};


export const getUserInfo = function (token) {
    console.log('================ getUserInfo REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'get_user_info',
        token: token,
    }));
    console.log('================ getUserInfo REQUEST ===============');
    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'get_user_info',
            token: token,
        })
    }).then((res) =>{
        if(res.status !== HTTP_STATUS_OK) return Promise.reject(res.text());

        return res.json();
    }).then((data)=>{
        if ( data.user_info.order!==null){


            data.user_info.order =  {
                clientId: data.user_info.order.client_id,
                driverId: data.user_info.order.driver_id,
                id: data.user_info.order.id,
                entrance: data.user_info.order.entrance,
                status: parseInt(data.user_info.order.status,10),
                comment: data.user_info.order.comment,
                price: data.user_info.order.price,


                startPoint: {
                    label: data.user_info.order.start_point_text,
                    value: {
                        lat: data.user_info.order.start_point.lat,
                        lon: data.user_info.order.start_point.lon
                    }
                },


                endPoints: data.user_info.order.end_points.map((el, index)=> {
                    return {
                        label: data.user_info.order.end_points_text[index],
                        value: {
                            lat: el.lat,
                            lon: el.lon
                        }
                    }
                }),
            };


        }

        return data;
    });
};

export const autocomleteRequest = function (input) {
    return fetch(PROXY,{
        method: 'POST',
        body: JSON.stringify({
            data: {
                input: input,
            }
        })
    }).then((res) => res.json());
};




export const removeTrade = function (orderId,driverId,token) {
    console.log('================ skip_one_trade REQUEST ===============');
    console.log('body: ', JSON.stringify({
        action: 'skip_one_trade',
        token: token,
        data: {
            order_id: orderId,
            driver_id: driverId
        }
    }));
    console.log('================ skip_one_trade REQUEST ===============');

    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'skip_one_trade',
            token: token,
            data: {
                order_id: orderId,
                driver_id: driverId
            }
        })
    }).then((res) => res.text()).then(data=>{console.error(data)});
};

