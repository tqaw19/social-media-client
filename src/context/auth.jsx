import React, { createContext, useReducer } from 'react'

const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { },
})

function AuthReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        default:
            return state

    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(AuthReducer, { user: null })

    function login(userData) {
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    function logout() {
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                login, logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
