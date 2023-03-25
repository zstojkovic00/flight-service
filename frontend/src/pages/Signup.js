import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

const Signup = () => {

    const handleSubmit = () => {

    };

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Box marginLeft="auto" marginRight="auto"
                     width={1000}
                     display="flex"
                     flexDirection={"column"}
                     justifyContent="center"
                     alignItems="center"


                >
                    <Typography variant="h2" mt={10} sx={{ color: "#1976d2" }} >Signup</Typography>
                    <TextField variant="outlined" placeholder="Name" margin="normal"/>
                    <TextField variant="outlined" placeholder="Email" margin="normal"/>
                    <TextField variant="outlined" placeholder="Password" margin="normal"/>
                    <Button  size="large" variant="contained" type="submit">Join</Button>


                </Box>
            </form>
        </div>
    );
};

export default Signup;