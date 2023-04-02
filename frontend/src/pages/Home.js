import React, {useEffect, useState} from 'react';
import {fetchUserData} from "../api/authenticationService";
import {useNavigate} from "react-router-dom";
import FlightSearchForm from "../components/FlightSearchForm";
import {Grid, Box, Typography} from '@mui/material';
import "./home.css"

const Home = (props) => {

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


    function refreshPage() {
        window.location.reload();
    }

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    }



    return (
        <div>
            <h1 className="flightNaslov">Compare and book flights with ease</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <FlightSearchForm/>
                </Grid>
            </Grid>
            <Box mt={4}>
                <h1 className="flightNaslov">Popular Flights</h1>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{height: 200, bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="h6" align="center">Flight Name</Typography>
                            <Typography variant="body1" align="center">Country</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{height: 200, bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="h6" align="center">Flight Name</Typography>
                            <Typography variant="body1" align="center">Country</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{height: 200, bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Typography variant="h6" align="center">Flight Name</Typography>
                            <Typography variant="body1" align="center">Country</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};



export default Home;