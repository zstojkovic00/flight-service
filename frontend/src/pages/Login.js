import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {userLogin} from "../api/authenticationService";
import { authenticate,authSuccess } from '../redux/authActions';
import { connect } from 'react-redux';
import {Box, Button, TextField, Typography} from "@mui/material";


const Login = ({loading,error,...props}) => {
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
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.authenticate();

        userLogin(inputs).then((res)=>{

            console.log("response",res);
            if(res.status===200){
                props.setUser(res.data);
                navigate("/user");
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

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth.loading,
        error:auth.error
    }}

const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login);