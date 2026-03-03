const { createContext, useState } = require("react");

export const authContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    
    return (
        <AuthProvider.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </AuthProvider.Provider>
    )
}