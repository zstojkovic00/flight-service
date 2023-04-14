import React, {useEffect, useState} from 'react';
import {fetchUserData} from "../api/apiService";
import {useNavigate} from "react-router-dom";
import FlightSearchForm from "../components/FlightSearchForm";
import {Grid} from '@mui/material';
import "./home.css"
import backgroundImage from '../assets/images/plane.jpg'

const Home = () => {

    const [data, setData] = useState();
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



    return (

        <div>
            <div className="flightSomething" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '40vh' // set a minimum height to cover the whole viewport
            }}>

            </div>
        <div className="flightElement">
            <h1 className="flightNaslov">Book cheap flights</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <FlightSearchForm/>
                </Grid>
            </Grid>
        </div>
        </div>
    );
};



export default Home;