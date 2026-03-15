import { createContext, useContext, useState } from "react"

interface User {
  username: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  register: (username: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

const USERS_KEY = "app_users"
const SESSION_KEY = "app_session"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  })

  const getUsers = (): Record<string, string> => {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  }

  const register = (username: string, password: string): boolean => {
    const users = getUsers()
    if (users[username]) return false // already exists
    users[username] = password
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    const newUser = { username }
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    setUser(newUser)
    return true
  }

  const login = (username: string, password: string): boolean => {
    const users = getUsers()
    if (users[username] !== password) return false
    const loggedIn = { username }
    localStorage.setItem(SESSION_KEY, JSON.stringify(loggedIn))
    setUser(loggedIn)
    return true
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
