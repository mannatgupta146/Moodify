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

  const handleLogin = async ({ username, email, password }) => {
    setLoading(true)
    try {
      const data = await login({ username, email, password })
      setUser(data.user)
    } catch (error) {
      console.log(error)
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
      const data = await logout({ username, email, password })
      setUser(data.user)
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
