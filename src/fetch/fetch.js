const URL = 'https://test.kak-pravilno.by/taxi/client_api.php';


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
    }).then((res) =>{
        if(res.status === HTTP_STATUS_BAD_REQUEST) return false;
        return res.json();
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
        alert(res.status);
        alert(res.json());
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