import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { HomePage, DetailsPage, FavoritesPage, LoginPage, ApprovedPage } from '../pages'
import { useAuth } from '../hooks' 

export const AppRoutes = () => {
  const { user } = useAuth() 
  return (
    <Routes>
      {
        user.status === 'not-authenticated'
          ? (
            <>
              <Route path='login' element={<LoginPage />} />
              <Route path='favorites' element={<FavoritesPage />} />
            </>
          )
          : (
            <>
              <Route path='login' element={<Navigate to={'/'} />} />
              <Route path='favorites' element={<Navigate to={'/'} />} />
            </>
          )
      }
      <Route path='/'>
        <Route index element={<HomePage />} />
        <Route path='category/:catg' element={<HomePage />} />
        <Route path='search/:search' element={<HomePage />} />
      </Route>
      <Route path='/details/:id' element={<DetailsPage />} />
      <Route path='approved' element={<ApprovedPage />} />

    </Routes>
  )
}
