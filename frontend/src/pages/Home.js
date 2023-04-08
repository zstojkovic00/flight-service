import React, {useEffect, useState} from 'react';
import {fetchUserData} from "../api/apiService";
import {useNavigate} from "react-router-dom";
import FlightSearchForm from "../components/FlightSearchForm";
import {Grid} from '@mui/material';
import "./home.css"

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
            <h1 className="flightNaslov">Compare and book flights with ease</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <FlightSearchForm/>
                </Grid>
            </Grid>

        </div>
    );
};



export default Home;