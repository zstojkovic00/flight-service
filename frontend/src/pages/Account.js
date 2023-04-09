import React, {useState, useEffect} from 'react';
import {
    Container,
    Avatar,
    TextField,
    Button,
    CircularProgress,
    styled,
} from '@mui/material';

import {currentUser, updateCurrentUser} from "../api/apiService";

const RootContainer = styled(Container)({
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const AvatarImage = styled(Avatar)({
    width: '120px',
    height: '120px',
    marginBottom: '16px',
});

const Form = styled('form')({
    width: '100%',
    marginTop: '8px',
});

const SubmitButton = styled(Button)({
    margin: '24px 0 16px',
});

const AccountDetails = () => {
    const [user, setUser] = useState(null);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        photo: "",

    })
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        currentUser().then((res) => {
            setUser(res.data);
            console.log(res.data.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }, []);


    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setInputs((prev) => ({
            ...prev,
            photo: file,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        updateCurrentUser(inputs).then((res) => {
            if (res.status === 200) {
                setUser(res.data);
                window.location.reload();

            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }

    if (!user) {
        return <CircularProgress/>;
    }

    return (
        <RootContainer maxWidth="xs">
            <label htmlFor="photo-input">
                <Avatar
                    sx={{ width: '120px', height: '120px', marginBottom: '16px' }}
                    src={`http://localhost:5000/img/users/${user?.data?.data?.photo}`}
                    alt={user.name}
                />
            </label>
            <input
                type="file"
                id="photo-input"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
            />
            <Form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    name="name"
                    value={inputs.name || ''}
                    placeholder={user?.data?.data?.name || ''}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    value={inputs.email || ''}
                    placeholder={user?.data?.data?.email || ''}
                    onChange={handleChange}
                />

                <SubmitButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24}/> : 'Save Changes'}
                </SubmitButton>
            </Form>
        </RootContainer>
    );
};

export default AccountDetails;
