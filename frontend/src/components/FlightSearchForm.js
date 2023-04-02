import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import { searchForFlight } from "../api/authenticationService";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

const FlightSearchForm = () => {
    const [inputs, setInputs] = useState({
        from: "",
        to: ""
    });

    const [date, setDate] = useState("");
    const [flights, setFlights] = useState([]);

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
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                {flights.map((flight) => (
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
                                        {new Date(flight.date).toLocaleDateString()}
                                    </Typography>
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {flight.to}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column"  }}>
                            <Typography variant="h6" gutterBottom>
                                {flight.airlines}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                {flight.price}$
                            </Typography>
                        </Box>
                        <Button  variant="contained" color="primary" type="submit" >
                            Book Now!
                        </Button>
                    </Box>

                ))}
            </Box>
        </>
    );
};

export default FlightSearchForm;
