import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Tab, Tabs } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {fetchUserData} from '../api/authenticationService'

const Header = () => {
    const [value, setValue] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        const token = localStorage.getItem('USER_KEY');
        if (token) {
            setIsLoggedIn(true);
            fetchUserData().then((response)=>{
                setIsAdmin(response.data?.data?.data.role === 'admin');
                console.log(response.data?.data?.data.role);

            }) } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h3">Iza Oblaka</Typography>
                    <Box sx={{ marginLeft: 'auto' }}>
                        <Tabs value={value} onChange={(e, val) => setValue(val)} textColor="inherit">
                            {isLoggedIn ? (
                                isAdmin ? (
                                    [
                                        <Tab key="dashboard" to="/dashboard" component={Link} label="Dashboard" />,
                                        <Tab key="logout" to="/" onClick={handleLogout} label="Logout" />,
                                    ]
                                ) : (
                                    <Tab to="/" onClick={handleLogout} label="Logout" />
                                )
                            ) : (
                                [
                                    <Tab key="login" to="/login" component={Link} label="Login" />,
                                    <Tab key="signup" to="/signup" component={Link} label="Signup" />,
                                ]
                            )}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
