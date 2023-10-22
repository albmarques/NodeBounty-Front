import { createContext, useEffect, useState } from 'react'

import { api } from '../lib/api'

export const authContext = createContext({})

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null)
  const [authIsLoading, setAuthIsLoading] = useState(false)

  // Recuperando token do localstorage caso exista
  useEffect(() => {
    async function retrieveToken() {
      setAuthIsLoading(true)
      const token = localStorage.getItem('node-bounty')
      if (token) {
        setToken(token)
        api.defaults.headers.common.Authorization = token
      }
      setAuthIsLoading(false)
    }
    retrieveToken()
  }, [])

  // Método para salvar o token no localstorage e depois no estado
  function saveToken(token) {
    localStorage.setItem('node-bounty', token)
    setToken(token)
    api.defaults.headers.common.Authorization = token
  }

  // Método para remover o token (Fazer logout)
  function logout() {
    localStorage.removeItem('node-bounty')
    setToken(null)
  }

  return (
    <authContext.Provider
      value={{
        token,
        authIsLoading,
        saveToken,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
