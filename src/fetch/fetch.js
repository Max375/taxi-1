const URL = 'https://test.kak-pravilno.by/taxi/client_api.php';
const PROXY = 'https://test.kak-pravilno.by/taxi/proxy.php';


export const HTTP_STATUS_USER_INACTIVE = 426;
export const HTTP_STATUS_USER_UNAUTHORIZED = 401;
export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_NOT_FOUND = 404;
export const HTTP_STATUS_OK = 200;


export const loginUser = function (phone) {

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
    alert(JSON.stringify(JSON.stringify({
        action: 'sms_auth',
        device_id: deviceId,
        data: {
            phone: phone,
            pin: pin
        }
    })));
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

export const createOrder = function (startPoint, startPointText, endPoints, endPointsText, price, options, token, deviceId) {

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
                options: {
                    key: 'value',
                }
            }
        })
    }).then(res => {
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
        if(res.status === HTTP_STATUS_BAD_REQUEST) return false;
        return true;
    });
};


export const cancelOrder = function (token) {
    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'cancel_order',
            token: token,
        })
    }).then((res) =>{
        if(res.status === HTTP_STATUS_BAD_REQUEST) return false;
        return true;
    });
};


export const getUserInfo = function (token) {
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


