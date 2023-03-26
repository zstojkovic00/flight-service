import React, {useEffect, useState} from 'react';
import axios from "axios";

axios.defaults.withCredentials = true;


// let firstRender = true;
const Home = () => {
    const [user, setUser] = useState();

    // const refreshToken = async () => {
    //     const res = await axios.get("http://localhost:5000/api/v1/refresh", {
    //         withCredentials: true
    //     }).catch(err => console.log(err))
    //
    //     const data = await res.data;
    //
    //     return data;
    // }
    const sendRequest = async () => {
        const res = await axios.get("http://localhost:5000/api/v1/user", {
            withCredentials: true
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }


    useEffect(() => {
        // if (firstRender) {
        //     firstRender = false
        //     sendRequest().then((data) => setUser(data.user))
        //
        // }
        // let interval = setInterval(()=> {
        //   refreshToken().then(data=>setUser(data))
        // }, 1000 * 290)
        // return () => clearInterval(interval);

        sendRequest().then((data)=> setUser(data.user))

    }, [])


    return (
        <div>
            {user && <h1> {user.name} </h1>}
        </div>
    );
};

export default Home;