import { createContext, useState, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

import { recoveryUserInformation, signInRequest } from "../services/auth";

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'edu.token': token } = parseCookies()

    if(token) {
      recoveryUserInformation().then(response => {
        setUser(response.user)
      })  
    }
  }, [])

  const notify = (e) => toast(e + " Wow so easy!");

  async function signIn({ email, password}) {
    try {
      const { token, user } = await signInRequest({
        user: email,
        password
      })

      setCookie(undefined, 'edu.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      setUser(user)

      // Router.push('/posts')
      Router.push('/panel')
    } catch (error) {
      console.log(error.message)
      console.log(error.response.data)
      notify(error.response.data.message)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

