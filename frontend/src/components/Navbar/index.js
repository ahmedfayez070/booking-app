import React, { useContext } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function Navbar() {
  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          InsightBooking
        </Link>
        {user ? (
          <div>{user.username}</div>
        ) : (
          <div className="nav-items">
            <button className="nav-button">Register</button>
            <Link to="/login">
              <button className="nav-button">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
