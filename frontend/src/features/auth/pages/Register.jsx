import React from 'react'
import '../styles/auth.scss'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>Login User</h1>
        <form>
          <FormGroup label="username" placeholder="Enter your username" />
          <FormGroup label="email" placeholder="Enter your email" />
          <FormGroup label="password" placeholder="Enter your password" />
          <button type="submit" className='auth-btn'>Login</button>
        </form>

        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register