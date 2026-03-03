import { useContext } from "react";
import { authContext } from "../context/auth.context";
import { login, register, getMe, logout }  from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(authContext)
    const {user, setUser, loading, setLoading} = context

    const handleRegister = async({username, email, password}) =>{
        setLoading(true)
        try {
            const data = await register({username, email, password})
            setUser(data.user)

        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async({username, email, password}) =>{
        setLoading(true)
        try {
            const data = await login({username, email, password})
            setUser(data.user)

        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }

    const handlegetMe = async() =>{
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

    const handleLogout = async() =>{
        setLoading(true)
        try {
            const data = await logout({username, email, password})
            setUser(data.user)

        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }
}