import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser, setToken } from './db/datasource'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        // const users = getUsers()
        // const user = users.find(user => user.email === email && user.password === password)

        if (!email) {
            setError('Please enter your email')
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Invalid email address')
            return
        }

        if (!password) {
            setError('Please enter your password')
            return
        }
        loginUser({ email, password }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                setToken(response?.data?.token)
                navigate('/login_success')
            } else {
                setError(response?.data?.message)
            }
        })
    }

    return (
        <div className="container">
            <h1 className="text-center">Login</h1>
            <div className="form-container">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group text-center mt-2">
                        <Link to="/register" className="btn btn-link">Register</Link>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
