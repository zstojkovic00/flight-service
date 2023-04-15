import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {bookingFlight, getFlightsBasedOnLocation} from "../api/apiService";
import {Box, Button, Typography} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightSearchForm from "../components/FlightSearchForm";

const CityPage = () => {
    const { cityName } = useParams();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const data = { to: cityName };
        getFlightsBasedOnLocation(data)
            .then((res) => {
                setFlights(res.data);
                console.log(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const bookFlight = async (flightId) => {
        bookingFlight(flightId)
            .then((res) => {
                console.log("response", res);
                if (res.status === 200) {
                    window.location.href = res.data.session.url;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleBookFlight = (flightId) => {
        bookFlight(flightId);
    };



    return (
        <div>
            <Typography
                variant='h2'
                gutterBottom
                sx={{
                    marginBottom: '1rem',
                    textAlign: 'center',
                }}
            >Flights to {cityName}

            </Typography>

            <Box sx={{mt: 5}}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <>
                        {flights?.length > 0 ? (
                            flights?.map((flight, key) => (
                                <Box
                                    key={key}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        p: 3,
                                        mb: 5,
                                        boxShadow: 7,
                                        position: "relative",
                                        maxWidth: "70%", mx: "auto"
                                    }}
                                >
                                    <Box sx={{display: "flex", alignItems: "center"}}>
                                        <FlightTakeoffIcon/>
                                        <Box sx={{ml: 2}}>
                                            <Typography variant="h5" gutterBottom>
                                                {flight.from}{" "}
                                                <Typography
                                                    variant="body1"
                                                    component="span"
                                                    color="text.secondary"
                                                >
                                                    {new Date(flight.date).toLocaleDateString()}
                                                </Typography>
                                            </Typography>
                                            <Typography variant="h5" gutterBottom>
                                                {flight.to}
                                            </Typography>
                                        </Box>
                                    </Box>

                                        <Typography variant="h5">
                                            {new Date(flight.date).toLocaleDateString()}
                                        </Typography>

                                        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column"  }}>
                                            <Typography variant="h5" gutterBottom>
                                                {flight.departureTime}
                                            </Typography>
                                            <Typography variant="h5" gutterBottom>
                                                {flight.arrivalTime}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h5" gutterBottom>
                                            {flight.price}$
                                        </Typography>
                                    <Button onClick={() => handleBookFlight(flight._id)} variant="contained" color="primary" type="submit" >
                                        Book Now!
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography sx={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                textAlign: 'center',
                            }}>No flights found</Typography>
                        )}
                    </>
                )}
            </Box>
        </div>
    );
};

export default CityPage;
