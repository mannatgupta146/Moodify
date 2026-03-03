import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.scss'
import FormGroup from '../components/FormGroup'

const Login = () => {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>Login User</h1>
        <form>
          <FormGroup label="email" placeholder="Enter your email" />
          <FormGroup label="password" placeholder="Enter your password" />
          <button type="submit" className='auth-btn'>Login</button>
        </form>

        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  )
}

export default Login