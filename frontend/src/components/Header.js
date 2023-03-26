import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Box} from '@mui/material';
import {Tab, Tabs} from '@mui/material';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../api/authenticationService";
import {authActions} from "../store";


const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn)


    const handleLogout = () => {
        userLogout().then(() => dispatch(authActions.logout()))
    }

    const [value, setValue] = useState(0);


    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h3"> Iza Oblaka</Typography>
                    <Box sx={{marginLeft: "auto"}}>
                        <Tabs
                            // TabIndicatorProps={{
                            //     style: {
                            //         backgroundColor: "white"
                            //     }
                            // }}
                            value={value}
                            onChange={(e, val) => setValue(val)}
                            textColor="inherit"
                        >
                            {!isLoggedIn && <>
                            <Tab to="/login" LinkComponent={Link} label="Login"/>
                            <Tab to="/signup" LinkComponent={Link} label="Signup"/>
                            </> }
                            {isLoggedIn &&
                                (<Tab onClick={handleLogout} to="/" LinkComponent={Link} label="Logout"/>)}
                            {" "}


                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};


export default Header;
