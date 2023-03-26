import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {userJoin} from "../api/authenticationService";
import { useNavigate} from "react-router-dom";



const Signup = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setInputs(prev => ({
           ...prev,
            [e.target.name]: e.target.value
        }))
    console.log(e.target.name, "value", e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        // send http request

        userJoin(inputs).then((res)=>{

            console.log("response",res);
            if(res.status===201){
                navigate("/login");
                window.location.reload();
                alert("Your account has been activated successfully. You can now login.")
            }


        }).catch((err)=>{

            console.log(err);

        });

    }


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <Box marginLeft="auto" marginRight="auto"
                     display="flex"
                     flexDirection={"column"}
                     justifyContent="center"
                     alignItems="center"


                >
                    <Typography variant="h2" mt={10} sx={{color: "#1976d2"}}>Signup</Typography>

                    <TextField
                        name="name"
                        onChange={handleChange}
                        value={inputs.name}
                        variant="outlined"
                        placeholder="Name"
                        margin="normal"
                    />

                    <TextField
                        name="email"
                        onChange={handleChange}
                        type={'email'}
                        value={inputs.email}
                        variant="outlined"
                        placeholder="Email"
                        margin="normal"
                    />

                    <TextField
                        name="password"
                        onChange={handleChange}
                        type={'password'}
                        value={inputs.password}
                        variant="outlined"
                        placeholder="Password"
                        margin="normal"
                    />

                    <Button size="large" variant="contained" type="submit">Join</Button>


                </Box>
            </form>
        </div>
    );
};

export default Signup;