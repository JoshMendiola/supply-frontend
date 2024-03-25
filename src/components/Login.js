import React, { useState } from 'react';
import { useAuth} from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission

        // The requestBody uses the state variables for username and password
        const requestBody = {
            username: username,
            password: password
        };

        // Fetch request to the backend
        fetch('https://team-11.supply.seuswe.rocks/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })

            .then(data => {
                if(data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('username', data.username)
                    login(username, data.access_token);
                    setUsername('');
                    setPassword('');
                } else {
                    // Display an error message to the user
                    alert('Login failed: ' + data.msg);
                    setUsername('');
                    setPassword('');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
                setUsername('');
                setPassword('');
            });
    };

    return (
        <div>
            <form action="https://team-11.supply.seuswe.rocks/api/login" method="POST" id="loginform" onSubmit={handleSubmit}>

                <div>
                    <label><b>Username:</b></label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter Username"
                        name="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label><b>Password:</b></label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" id="login-button">Login</button>
                </div>
            </form>
        </div>
    );
};



export default Login;