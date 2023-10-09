import { createContext, useEffect, useState } from 'react'

export const authContext = createContext({})

export function AuthContextProvider({children}) {
  const [token, setToken] = useState(null)
  const [authIsLoading, setAuthIsLoading] = useState(false)

  // Recuperando token do localstorage caso exista
  useEffect(() => {
    async function retrieveToken() {
      setAuthIsLoading(true)
      const token = localStorage.getItem('node-bounty')
      if (token) {
        setToken(token)
      }
      setAuthIsLoading(false)
    }
    retrieveToken()
  }, [])

  // Método para salvar o token no localstorage e depois no estado
  function saveToken(token) {
    localStorage.setItem('node-bounty', token)
    setToken(token)
  }

  return (
    <authContext.Provider
      value={{
        token,
        authIsLoading,
        saveToken,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
