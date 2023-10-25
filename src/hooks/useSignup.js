import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (data) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/donor/register', {
      mode: "no-cors",
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    console.log(response.json());
    if (!response.ok) {
      setIsLoading(false)
      setError(response.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(response))

      // update the auth context
      dispatch({type: 'LOGIN', payload: response})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}