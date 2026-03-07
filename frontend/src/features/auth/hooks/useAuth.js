import { useContext } from "react"
import { login, register, getMe, logout } from "../services/auth.api"
import { AuthContext } from "../context/auth.context"

export const useAuth = () => {
  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading } = context

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true)
    try {
      const data = await register({ username, email, password })
      setUser(data.user)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async ({ email, username, password }) => {
    setLoading(true)
    try {
      const data = await login({ email, username, password })
      setUser(data.user)
      return true
    } catch (error) {
      console.log(error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const handlegetMe = async () => {
    setLoading(true)
    try {
      const data = await getMe()
      setUser(data.user)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      setUser(null)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handlegetMe,
    handleLogout,
  }
}
