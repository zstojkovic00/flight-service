import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {getFlightBySlug} from "../api/apiService";
import {Box, Typography} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const CityPage = () => {
    const { cityName } = useParams();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        getFlightBySlug(cityName)
            .then((res) => {
                setFlights(res.data);
                console.log(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1>Flights to {cityName}</h1>

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


                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography variant="h6" gutterBottom>
                                            {flight.airlines}
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            {flight.price}$
                                        </Typography>
                                    </Box>
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
