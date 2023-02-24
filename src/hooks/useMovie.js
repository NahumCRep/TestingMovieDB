import { useState, useEffect, useContext } from 'react'
import { MoviesContext } from '../context/MoviesContext'
import MovieApi from '../api'
import { api_key } from '../api/config'

export const useMovie = () => {
    const [movieData, setMovieData] = useState({
        data: null,
        isLoading: true,
        hasError: null
    })
    const [categories, setCategories] = useState()
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 1
    })

    //Context
    const {favoriteMovies, addFavoriteMovie, delFavoriteMovie} = useContext(MoviesContext)

    const getMovies = async ({page = 1, searchValue = ''}) => {
        setMovieData({
            ...movieData,
            isLoading: true
        })

        try {
            let movies = {} 
            if(!searchValue){
                movies = await MovieApi.get(`/discover/movie?api_key=${api_key}&page=${page ? page : 1}`)
            }else{
                console.log('search', searchValue)
                movies = await MovieApi.get(`/search/movie?api_key=${api_key}&query=${searchValue}&page=${page ? page : 1}`)
            }
            
            console.log(movies.data.total_pages)
            setPagination({
                page: movies.data.page,
                totalPages: movies.data.total_pages
            })

            setMovieData({
                data: movies.data.results,
                isLoading: false,
                hasError: null
            })
        } catch (error) {
            console.log(error)
            setMovieData({
                data: null,
                isLoading: false,
                hasError: 'Error al obtener las peliculas'
            })
        }
    }

    const getMovie = async (movieID) => {
        setMovieData({
            ...movieData,
            isLoading: true
        })

        try {
            const movie = await MovieApi.get(`/movie/${movieID}?api_key=${api_key}`)
            setMovieData({
                data: movie.data,
                isLoading: false,
                hasError: null
            })
        } catch (error) {
            setMovieData({
                data: null,
                isLoading: false,
                hasError: 'Error al obtener los detalles de la pelicula'
            })
        }
    }

    const getCategories = async () => {
        try {
            const resp = await MovieApi.get(`/genre/movie/list?api_key=${api_key}`)
            setCategories(resp.data.genres)
            console.log(resp)
        } catch (error) {
            console.log('Error al obtener categorias')
        }
    }

    const getFavorites = async () => {
        let favoriteList = []
        setMovieData({
            ...movieData,
            isLoading: true
        })

        try {
            
            let favoritePromisesList = []
            for(fav of favoriteMovies){
                favoritePromisesList.push(MovieApi.get(`/movie/${movieID}?api_key=${api_key}`))
            }
            
            const movieList = await Promise.all(favoritePromisesList)

            setMovieData({
                data: movieList,
                isLoading: false,
                hasError: null
            })
 
        } catch (error) {
            setMovieData({
                data: null,
                isLoading: false,
                hasError: 'Error al obtener los favoritos'
            })
        }
    }

    const addMovieToFavorites = (movieID) => {
        addFavoriteMovie(movieID)
    }

    const deleteMovieToFavorites = (movieID) => {
        delFavoriteMovie(movieID)
    }

    return {
        ...movieData,
        ...pagination,
        favoriteMovies,
        categories,
        getMovies,
        getMovie,
        getCategories,
        getFavorites,
        addMovieToFavorites,
        deleteMovieToFavorites
    }
}
