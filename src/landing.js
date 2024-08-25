import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>
      <div className="container text-center mt-5 mb-5">
        <h1 className="mb-3">Welcome to Users Module</h1>
        <h5 className="mb-3 mt-5">Existing Users</h5>
        <Link to="/login" className="btn btn-primary mb-3 mt-3">Login</Link>
        <h5 className="mb-3 mt-5">New Users</h5>
        <Link to="/register" className="btn btn-primary mb-3 mt-3">Register</Link>
      </div>
    </div>
  )
}

export default Landing