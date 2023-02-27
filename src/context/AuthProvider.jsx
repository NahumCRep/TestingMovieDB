import React, { useReducer } from 'react'
import { AuthContext } from "./AuthContext";
import { AuthReducer } from './AuthReducer'

export const AuthProvider = ({children}) => {
  const INITIAL_STATE = {
    session_id: null,
    status: 'not-authenticated'
  }

  const [auth, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  const authLogin = (authObject) => {
    dispatch({type:'login', payload:authObject})
  }

  const authLogout = () => {
    dispatch({type:'logout', payload:{}})
  }

  return (
    <AuthContext.Provider value={{
      auth,
      authLogin,
      authLogout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
