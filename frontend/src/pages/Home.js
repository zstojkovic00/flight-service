import React, {useEffect, useState} from 'react';
import {fetchUserData, getAllCities} from "../api/apiService";
import {useNavigate} from "react-router-dom";
import FlightSearchForm from "../components/FlightSearchForm";
import {Grid} from '@mui/material';
import "./home.css"
import backgroundImage from '../assets/images/plane.jpg'
import CityCard from '../components/CityCard';

const Home = () => {

    const [data, setData] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);


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


    useEffect(() => {
        getAllCities().then((res)=>{
            setCities(res?.data?.data.data);
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);



    return (

        <div>
            <div className="flightSomething" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '40vh'
            }}>

            </div>
        <div className="flightElement">
            <h1 className="flightNaslov">Book cheap flights</h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={6}>
                    <FlightSearchForm/>
                </Grid>
            </Grid>
            <h1 className="flightPodNaslov">Popular right now</h1>
            <h2 className="flightH2">Other travellers are loving these destinations.
            </h2>
        </div>

            <Grid container spacing={3}>
                {cities?.map((city) => (
                    <Grid item key={city._id} xs={12} sm={6} md={4} lg={3}>
                        <CityCard city={city} />
                    </Grid>
                ))}
            </Grid>

        </div>
    );
};



export default Home;