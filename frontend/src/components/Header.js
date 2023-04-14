import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography, Box, Avatar} from '@mui/material';
import {Tab, Tabs} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {fetchUserData} from '../api/apiService'
import Cloud from "../cloud.png"

const Header = () => {
    const [value, setValue] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
    };

    useEffect(() => {
        const token = localStorage.getItem('USER_KEY');
        if (token) {
            setIsLoggedIn(true);
            fetchUserData().then((response) => {
                setIsAdmin(response.data?.data?.data.role === 'admin');
                setUserData(response.data?.data?.data);
            })
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, []);

    const {name} = userData;


    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography
                        to="/"
                        component={Link}
                    >
                        <img src={Cloud} alt="Cloud" style={{
                            width: '70px',
                            height: '70px',
                        }} />
                    </Typography>
                    <Box sx={{marginLeft: 'auto'}}>
                        <Tabs value={value} onChange={(e, val) => setValue(val)} textColor="inherit">
                            {isLoggedIn ? (
                                isAdmin ? (
                                    [
                                        <Tab key="dashboard" to="/dashboard" component={Link} label="Dashboard"/>,
                                        <Tab key="my-fligts" to="/my-flights" component={Link} label="My Flights"/>,
                                        <Tab key="logout" to="/" onClick={handleLogout} label="Logout"/>,
                                        <Tab
                                            key="avatar"
                                            icon={  <Avatar src={`http://localhost:5000/img/users/${userData?.photo}`}
                                                            alt={userData.name} />}
                                            to="/my-account"
                                            component={Link}
                                        />]
                                ) : (
                                    [
                                        <Tab key="my-fligts" to="/my-flights" component={Link} label="My Flights"/>,
                                        <Tab key="logout" to="/" onClick={handleLogout} label="Logout"/>,
                                        <Tab
                                            key="avatar"
                                            icon={  <Avatar src={`http://localhost:5000/img/users/${userData?.photo}`}
                                                            alt={userData.name} />}
                                            to="/my-account"
                                            component={Link}
                                        />
                                    ]
                                )
                            ) : (
                                [
                                    <Tab key="login" to="/login" component={Link} label="Login"/>,
                                    <Tab key="signup" to="/signup" component={Link} label="Signup"/>,
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
