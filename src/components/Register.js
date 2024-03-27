import React, { useState } from 'react';
import {useAuth} from "../context/AuthContext";

const Register = ({ onRegisterSuccess }) => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const requestBody = {
            username: username,
            password: password,
            email: email,
        };

        try {
            const response = await fetch('https://team-11.supply.seuswe.rocks/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (data.access_token) {

                // Clear the fields
                setUsername('');
                setPassword('');
                setEmail('');
                setConfirmPassword('');

                // Assuming the login function updates the context and local storage appropriately
                login(username, data.access_token); // Use the login method from your context
                onRegisterSuccess();
            } else {
                // Display an error message to the user
                alert(data.msg);
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <form action="https://team-11.supply.seuswe.rocks/api/register" method="POST" id="signup-form" onSubmit={handleSubmit}>
                <div className="signup-div">
                    <div className="signup-group">
                        <label htmlFor="username"><b>Username:</b></label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="signup-group">
                        <label htmlFor="email"><b>Email:</b></label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter Email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="signup-group">
                        <label htmlFor="password"><b>Password:</b></label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="password"><b>Confirm Password:</b></label>
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Enter Password"
                            name="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" id="signup-button">Sign-Up</button>
                </div>
            </form>
        </div>
    );
};


export default Register;