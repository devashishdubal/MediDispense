import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Link,
    Grid,
    Alert,
    AlertTitle,
} from '@mui/material';
import './Login.css'; // Import the CSS file

function Login() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only used for register
    const [alert, setAlert] = useState({ type: '', message: '' }); // Alert state

    const handleAuth = async () => {
        try {
            if (!email || !password || (!isLogin && !name)) {
                setAlert({
                    type: 'error',
                    message: 'Please fill out all required fields.',
                });
                return;
            }

            const endpoint = 'http://localhost:8000/users/' + (isLogin ? 'login' : 'register');
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                setAlert({
                    type: 'error',
                    message: errorData.message || 'Something went wrong. Please try again.',
                });
                return;
            }

            const user = await response.json();
            setUser(user);
            setAlert({
                type: 'success',
                message: isLogin ? 'Login successful!' : 'Registration successful!',
            });
            setTimeout(() => navigate('/dashboard'), 1500); // Redirect after success
        } catch (error) {
            console.log(error);
            setAlert({
                type: 'error',
                message: 'Something went wrong. Please try again.',
            });
        }
    };

    return (
        <Container maxWidth="sm" className="auth-container">
            <Box className="auth-box">
                <Typography component="h1" variant="h5" className="auth-heading">
                    {isLogin ? 'Login' : 'Register'}
                </Typography>

                {/* Display Alert */}
                {alert.message && (
                    <Alert
                        severity={alert.type}
                        onClose={() => setAlert({ type: '', message: '' })}
                        className="auth-alert"
                    >
                        <AlertTitle>{alert.type === 'error' ? 'Error' : 'Success'}</AlertTitle>
                        {alert.message}
                    </Alert>
                )}

                <Box component="form" noValidate>
                    {!isLogin && (
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="auth-input"
                        />
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="auth-input"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="auth-button"
                        onClick={handleAuth}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography variant="body2" className="auth-toggle">
                                {isLogin ? (
                                    <>
                                        Don't have an account?{' '}
                                        <Link
                                            href="#"
                                            variant="body2"
                                            onClick={() => setIsLogin(false)}
                                            className="toggle-link"
                                        >
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <Link
                                            href="#"
                                            variant="body2"
                                            onClick={() => setIsLogin(true)}
                                            className="toggle-link"
                                        >
                                            Login
                                        </Link>
                                    </>
                                )}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
