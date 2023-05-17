import React from 'react'
const AuthContext = React.createContext()

import reducer, { initialLoginState } from '../store/auth/reducer'

export default AuthContext

export function AuthProvider({ children }) {
    const [state, dispatch] = React.useReducer(reducer, initialLoginState)
    return (
        <AuthContext.Provider value={{ auth: state, authDispatch: dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}