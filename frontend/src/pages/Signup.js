import React, {useState} from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";
import {userJoin} from "../api/apiService";
import { useNavigate} from "react-router-dom";
import { authenticate, authSuccess} from "../redux/authActions";
import { connect } from "react-redux";


const Signup = ({ loading, error,handleLoginSuccess, ...props }, {}) => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleChange = (e) => {
        setInputs(prev => ({
           ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        // send http request

        userJoin(inputs).then((res)=>{

            console.log("response",res);
            if(res.status===201){
                props.setUser(res.data);
                navigate("/");
                window.location.reload();
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

                    <TextField
                        name="passwordConfirm"
                        onChange={handleChange}
                        type={'password'}
                        value={inputs.passwordConfirm}
                        variant="outlined"
                        placeholder="Confirm Password"
                        margin="normal"
                    />

                    <Button size="large" variant="contained" type="submit">Join</Button>


                </Box>
            </form>
        </div>
    );
};
const mapStateToProps = ({ auth }) => {
    console.log("state ", auth);
    return {
        loading: auth.loading,
        error: auth.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Signup);