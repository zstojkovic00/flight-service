import axios from 'axios';
axios.defaults.withCredentials = true

export const userJoin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':"http://localhost:5000/api/v1/signup",
        'data':authRequest
    })
}



export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':"http://localhost:5000/api/v1/login",
        'data':authRequest
    })
}

export const userLogout=()=> {
    return axios({
        'method':'POST',
        'url':"http://localhost:5000/api/v1/logout",
        'data': null,
        withCredentials: true
    })
}


