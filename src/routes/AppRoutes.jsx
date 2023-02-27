import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage, DetailsPage, FavoritesPage, LoginPage, ApprovedPage } from '../pages'
import { useAuth } from '../hooks'

export const AppRoutes = () => {
  const [status, setStatus] = useState('not-authenticated')
  const { user, getUser } = useAuth()

  useEffect(() => {
        const userInfo = getUser()
        setStatus(userInfo.status)
  },[])

  return (
    <Routes>
      {
        status === 'not-authenticated'
          ? (
            <>
              <Route path='login' element={<LoginPage />} />
              <Route path='favorites' element={<Navigate to={'/'} />} />
            </>
          )
          : (
            <>
              <Route path='login' element={<Navigate to={'/'} />} />
              <Route path='favorites' element={<FavoritesPage />} />
            </>
          )
      }
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path='category/:category' element={<HomePage />} />
        <Route path='search/:search' element={<HomePage />} />
      </Route>
      <Route path='/details/:id' element={<DetailsPage />} />
      <Route path='approved' element={<ApprovedPage />} />

    </Routes>
  )
}
