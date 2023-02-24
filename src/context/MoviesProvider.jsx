import React, { useReducer } from 'react'
import { MoviesContext } from "./MoviesContext";
import { MoviesReducer } from './MoviesReducer'

export const MoviesProvider = ({children}) => {
  const INITIAL_STATE = []
  const [movieState, dispatch] = useReducer(MoviesReducer, INITIAL_STATE)

  const addFavorite = (movieId) => {
    dispatch({type:'addFavMovie', payload:movieId})
  }

  const deleteFavorite = (movieId) => {
    dispatch({type:'deleteFavMovie', payload:movieId})
  }

  return (
    <MoviesContext.Provider value={{
      favoriteMovies: movieState,
      addFavoriteMovie: addFavorite,
      delFavoriteMovie: deleteFavorite
    }}>
      {children}
    </MoviesContext.Provider>
  )
}
