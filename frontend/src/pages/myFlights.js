import {useState, useEffect} from "react";
import {myFlights} from "../api/apiService";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import {Box, Typography} from "@mui/material";

const MyFlights = () => {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        myFlights()
            .then((res) => {
                setFlights(res?.data?.flights);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
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
    );
};

export default MyFlights;
