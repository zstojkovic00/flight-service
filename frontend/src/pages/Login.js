import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {userLogin} from "../api/authenticationService";
import {Box, Button, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {authActions} from "../store";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
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

        userLogin(inputs).then(()=> dispatch(authActions.login())).then(()=> navigate("/user")).catch((err)=>{

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
                    <Typography variant="h2" mt={10} sx={{color: "#1976d2"}}>Login</Typography>


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

export default Login;