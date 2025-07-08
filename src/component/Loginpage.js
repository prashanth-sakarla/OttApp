import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import users from '../assets/User';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        // Check if a user exists in the array with matching credentials
        const matchedUser = users.find(
            (user) => user.userName === email && user.password === password
        )

        if (matchedUser) {
            navigate('/')
        } else {
            setError('Invalid credentials')
        }
    }


    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
