import React from 'react'
import {Routes, Route} from 'react-router-dom'
import { HomePage, DetailsPage, FavoritesPage } from '../pages'

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/category/:catg' element={<HomePage />} />
        <Route path='/search/:search' element={<HomePage />} />
        <Route path='/details/:id' element={<DetailsPage />} />
        <Route path='/favorites' element={<FavoritesPage />} />
    </Routes>
  )
}
