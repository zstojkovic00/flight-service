import React, { useEffect, useState } from 'react';
import { allUsers, deleteUser } from '../api/apiService';
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Typography } from '@mui/material';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        allUsers()
            .then((res) => {
                setUsers(res?.data?.data.data);
                console.log(res?.data?.data.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleRemoveUser = (userId) => {
        setSelectedUser(userId);
        setDialogOpen(true);
    };

    const confirmRemoveUser = () => {
        deleteUser(selectedUser)
            .then((res) => {
                console.log(res);
                // update the users list
                setUsers(users.filter(user => user._id !== selectedUser));
                setSelectedUser(null);
                setDialogOpen(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const cancelRemoveUser = () => {
        setSelectedUser(null);
        setDialogOpen(false);
    };

    return (
        <Box sx={{ mt: 5 }}>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                    {users?.length > 0 ? (
                        users?.map((user, key) => (
                            <Box
                                key={key}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 3,
                                    mb: 5,
                                    boxShadow: 7,
                                    position: 'relative',
                                    maxWidth: "70%", mx: "auto"
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Tab
                                        key="avatar"
                                        icon={<Avatar alt={user.name} src={user.name} sx={{ width: 50, height: 50 }} />}
                                    />
                                    <Box sx={{ ml: 2 }}>
                                        <Typography variant="h5" gutterBottom>
                                            {user.name}{' '}
                                            <Typography
                                                variant="body1"
                                                component="span"
                                                color="text.secondary"
                                            ></Typography>
                                        </Typography>
                                        <Typography variant="h5" gutterBottom>
                                            {user.role}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleRemoveUser(user._id)}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))
                    ) : (
                        <Typography sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            textAlign: 'center',
                        }}>No users found</Typography>
                    )}
                    <Dialog
                        open={dialogOpen}
                        onClose={cancelRemoveUser}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Remove User</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to remove this user?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={cancelRemoveUser}>Cancel</Button>
                            <Button onClick={confirmRemoveUser} autoFocus>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Box>
    );
};

export default Dashboard;
