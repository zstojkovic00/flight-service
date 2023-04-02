import axios from 'axios';


const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userJoin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':"http://localhost:5000/api/v1/users/signup",
        'data':authRequest
    })
}



export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':"http://localhost:5000/api/v1/users/login",
        'data':authRequest
    })
}


export const fetchUserData=()=>{
    return axios({
        method:'GET',
        url:"http://localhost:5000/api/v1/users/me",
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}


export const searchForFlight = (flightRequest) => {
    return axios({
        method: 'POST',
        url:"http://localhost:5000/api/v1/flights/search",
        'data': flightRequest
    })
}


export const bookingFlight = (flightId) => {
    return axios({
        method: 'GET',
        url:`http://localhost:5000/api/v1/bookings/checkout-session/${flightId}`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}



