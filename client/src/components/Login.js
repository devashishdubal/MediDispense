import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

function Auth() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only used for register

    const handleAuth = async () => {
        try {
            if (!email || !password || (!isLogin && !name)) {
                alert('Please fill out all required fields.');
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

            const user = await response.json();
            setUser(user);
            alert(isLogin ? 'Login successful' : 'Registration successful');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-heading">{isLogin ? 'Login' : 'Register'}</h2>
                <div className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="form-input"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="form-input"
                        />
                    </div>
                    <button onClick={handleAuth} className="auth-button">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                    <p className="auth-toggle">
                        {isLogin ? (
                            <>
                                Don't have an account?{' '}
                                <span onClick={() => setIsLogin(false)} className="toggle-link">
                                    Register
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <span onClick={() => setIsLogin(true)} className="toggle-link">
                                    Login
                                </span>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Auth;
