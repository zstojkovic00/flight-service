import React, { useEffect, useState } from 'react';
import { fetchUserData, getAllCities } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
import FlightSearchForm from '../components/FlightSearchForm';
import { Grid, Typography, Button } from '@mui/material';
import backgroundImage from '../assets/images/plane.jpg';
import CityCard from '../components/CityCard';

const Home = () => {
    const [data, setData] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [cities, setCities] = useState([]);
    const [numCities, setNumCities] = useState(8);

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
        getAllCities()
            .then((res) => {
                setCities(res?.data?.data.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleShowMoreCities = () => {
        setNumCities(numCities + 8);
    };

    return (
        <div>
            <div
                className='flightSomething'
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '40vh',
                }}
            ></div>
            <div className='flightElement'>
                <Typography
                    variant='h2'
                    gutterBottom
                    sx={{
                        marginBottom: '1rem',
                        textAlign: 'center',
                    }}
                >
                    Book cheap flights
                </Typography>
                <Grid container spacing={2} justifyContent='center'>
                    <Grid item xs={12} sm={8} md={6}>
                        <FlightSearchForm />
                    </Grid>
                </Grid>
                <Typography gutterBottom variant='h3'>
                    Popular right now
                </Typography>
                <Typography variant='h5'>
                    Other travellers are loving these destinations.
                </Typography>
            </div>

            <Grid container spacing={3}>
                {cities.slice(0, numCities).map((city) => (
                    <Grid item key={city._id} xs={12} sm={6} md={4} lg={3}>
                        <CityCard city={city} />
                    </Grid>
                ))}
            </Grid>

            {numCities < cities.length && (
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleShowMoreCities}

                    sx={{ mt: 2,     display: 'block',
                        margin: '2rem auto 0 auto' }}
                >
                    Show more cities
                </Button>

            )}
            <br/>
            <br/>
        </div>
    );
};

export default Home;
