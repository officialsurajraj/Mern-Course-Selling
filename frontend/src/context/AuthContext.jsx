import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

import {
    login as loginApi,
    registerUser as registerApi,
    logout as logoutApi,
    change_password as change_passwordApi,
    profile
} from "../services/authService"

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, seLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await profile();
                setUser(data?.user || null);
            } catch (error) {
                setUser(null);
            } finally {
                seLoading(false)
            }
        }
        fetchProfile();
    }, [])

    const login = async (credentials) => {
        const data = await loginApi(credentials)
        if (data?.user) {
            setUser(data.user);
        }
        return data;
    }
    const register = async (payload) => {
        const data = await registerApi(payload);
        return data;
    }
    const change_password = async (payload) => {
        const data = await change_passwordApi(payload);
        return data;
    }
    const logout = async () => {
        await logoutApi();
        setUser(null);
    }
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout, change_password }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
