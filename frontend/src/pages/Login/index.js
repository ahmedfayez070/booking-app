import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import useFetch from '../../hooks/useFetch'
import './index.scss'

export default function Login() {
  const [cradintials, setCradintials] = useState({
    username: undefined,
    password: undefined,
  })

  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCradintials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })
    try {
      const res = await axios.post(
        'http://localhost:8000/api/auth/login',
        cradintials
      )
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      navigate('/')
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <input
          placeholder="username"
          id="username"
          type="text"
          className="login-input"
          onChange={handleChange}
        />
        <input
          placeholder="password"
          id="password"
          type="text"
          className="login-input"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="login-button"
          onClick={handleClick}
        >
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}
