import React from 'react'
import { Link } from 'react-router-dom'

export default function RegisterSuccessful() {
  return (<>
    <div className="d-flex justify-content-center align-items-center flex-column mt-2x">
      <h2 className="text-center">Registered Successfully</h2>
      <Link to="/login" className="btn btn-primary btn-lg mt-3">Login</Link>
    </div>
  </>
  )
}
