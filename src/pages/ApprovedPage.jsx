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
    confirmLogin(token)
  }, [token])

  return (
    <div>Approved</div>
  )
}
