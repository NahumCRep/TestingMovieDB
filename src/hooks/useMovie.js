import { useState } from 'react'
import { api_key } from '../api/config'
import { MovieApi } from '../api'

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

    const getMovies = async ({page = 1, searchValue = '', category = ''}) => {
        const apiRoutes = {
            movies: '/discover/movie',
            search: '/search/movie'
        }

        setMovieData({
            ...movieData,
            isLoading: true
        })

        try {
            let queryUrl = ''
            let queryParams = { api_key, page}

            if(searchValue){
                queryUrl = apiRoutes.search
                queryParams.query = searchValue
            }else{
                queryUrl = apiRoutes.movies
                queryParams.with_genres = category
            }

            const movies = await MovieApi.get(queryUrl, {params: queryParams})
       
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
            const movie = await MovieApi.get(`/movie/${movieID}`, {params: { api_key }})
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
            const resp = await MovieApi.get('/genre/movie/list', {params: { api_key }})
            setCategories(resp.data.genres)
        } catch (error) {
            console.log('Error al obtener categorias')
        }
    }

   

    return {
        ...movieData,
        ...pagination,
        categories,
        getMovies,
        getMovie,
        getCategories,
    }
}
