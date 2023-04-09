import React, {useEffect, useState} from "react";
import {
    TextField,
    Button,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import {bookingFlight, searchForFlight,getCities} from "../api/apiService";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const FlightSearchForm = () => {
    const [inputs, setInputs] = useState({
        from: "",
        to: ""
    });

    const [date, setDate] = useState("");
    const [flights, setFlights] = useState([]);
    const [cities, setCities] = useState([]);


    useEffect(() => {
        getCities()
            .then((res) => {
                console.log("response", res);
                if (res.status === 200) {
                    setCities(res?.data?.data);
                    console.log(cities);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const searchInputs = { ...inputs, date: date };

        searchForFlight(searchInputs)
            .then((res) => {
                console.log("response", res);
                if (res.status === 200) {
                    setFlights(res.data);
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };




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
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} alignItems="center" sx={{ mt: 5 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="from"
                            type="from"
                            value={inputs.from}
                            onChange={handleChange}
                            label="From"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="to"
                            type="to"
                            value={inputs.to}
                            onChange={handleChange}
                            label="To"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={100}>
                        <TextField
                            label="Date"
                            type="date"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <Box sx={{ mt: 5 }}>
                {flights.map((flight,key) => (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 3, mb: 5, boxShadow: 7 }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <FlightTakeoffIcon />
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="h5" gutterBottom>
                                    {flight.from}{" "}
                                    <Typography
                                        variant="body1"
                                        component="span"
                                        color="text.secondary"
                                    >
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

                ))}
            </Box>
        </>
    );
};

export default FlightSearchForm;
