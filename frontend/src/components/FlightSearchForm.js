import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
} from "@mui/material";

const FlightSearchForm = (props) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // your search logic goes here
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" sx={{mt: 5}}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="From"
                        variant="outlined"
                        fullWidth
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="To"
                        variant="outlined"
                        fullWidth
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
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
    );
};

export default FlightSearchForm;
