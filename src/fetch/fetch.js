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


export const sendPin = function(phone, pin){
    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'sms_auth',
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



export const getStreet = function (street, token) {
    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'select_address',
            token: token,
            data: {
                street: street
            }
        })
    })
};


export const getDistance = function (data, token) {
    return fetch(URL,{
        method: 'POST',
        body: JSON.stringify({
            action: 'get_recommended_price',
            token: '$2y$10$kEo.dji3aa0qProwpzunQOqkQ1N5YIlV4Xu6ZeOTO2QnCOQmuEa5e',
            data: data
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