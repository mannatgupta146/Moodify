import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.scss'
import FormGroup from '../components/FormGroup'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const Login = () => {

  const navigate = useNavigate()

  const {loading, handleLogin} = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    await handleLogin({email, password})

    navigate('/')
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1>Login User</h1>
        <form>
          <FormGroup value={email} onChange={(e)=> setEmail(e.target.value)} label="email" placeholder="Enter your email" />
          <FormGroup value={password} onChange={(e)=> setPassword(e.target.value)} label="password" placeholder="Enter your password" />
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