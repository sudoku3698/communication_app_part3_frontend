import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { deleteLoggedInUser } from './db/datasource';

export default function Nav() {
    const navigate = useNavigate();
    function logout() {
        deleteLoggedInUser()
        navigate('/login')
    }
    return (<>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/chats">Chats</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/documents">Documents</Link>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div className="container">
            <Outlet />
        </div>
    </>)
}
