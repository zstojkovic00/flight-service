import React, {useEffect, useState} from 'react';
import {fetchUserData} from "../api/authenticationService";
import {useNavigate} from "react-router-dom";




const Home = (props) => {

    const [data,setData]=useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();





    useEffect(() => {
        const token = localStorage.getItem('USER_KEY');
        if (token) {
            setIsLoggedIn(true);
            fetchUserData()
                .then((response) => {
                    setData(response.data?.data?.data); // access updatedUser instead of data.data
                })
                .catch(() => {
                    localStorage.clear();
                    navigate('/');
                });
        } else {
            setIsLoggedIn(false);
            setData(null);
        }
    }, [navigate]);


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