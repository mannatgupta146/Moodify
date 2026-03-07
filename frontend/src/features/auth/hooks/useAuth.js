import { useContext } from "react"
import { login, register, getMe, logout } from "../services/auth.api"
import { AuthContext } from "../context/auth.context"
import { toast } from "react-toastify"

export const useAuth = () => {
  const context = useContext(AuthContext)
  const { user, setUser, loading, setLoading } = context

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true)
    try {
      const data = await register({ username, email, password })
      setUser(data.user)
      toast.success("Account created successfully!")
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async ({ email, username, password }) => {
    setLoading(true)
    try {
      const data = await login({ email, username, password })
      setUser(data.user)
      toast.success(`Welcome back, ${data.user.username}!`)
      return true
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed")
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
      toast.info("Logged out")
    } catch (error) {
      toast.error("Logout failed")
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
