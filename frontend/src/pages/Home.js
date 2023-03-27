import React, {useEffect, useState} from 'react';
import {fetchUserData} from "../api/authenticationService";
import {useNavigate} from "react-router-dom";




const Home = (props) => {

    const [data,setData]=useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();



    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data?.data?.data); // access updatedUser instead of data.data
            console.log(response.data?.data?.data);

        }).catch(()=>{
            localStorage.clear();
            props.history.push('/');
        })
    },[])

    useEffect(() => {
        const token = localStorage.getItem('USER_KEY');
        if (token) {
            setIsLoggedIn(true);
        }

    }, [setIsLoggedIn]);


    function refreshPage(){
        window.location.reload();
    }

    const logout =() => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    }


    return (
        <div>
            <h1> {data?.name} </h1>
        </div>
    );
};

export default Home;