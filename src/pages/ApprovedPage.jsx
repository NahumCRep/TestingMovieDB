import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks'

export const ApprovedPage = () => {
  const { confirmLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const token = params.get('request_token')

  if(!token){ 
    navigate('/login')
  }

  useEffect(() => {
    (async () => {
      const resp = await confirmLogin(token)
      if(resp && resp.ok){
        navigate('/')
      }
    })()

    return () => {}
  }, [token])

  return (
    <div className='approved-page'>
        <h1>Confirmando...</h1>
        <div className='approved-loader'></div>
    </div>
  )
}
