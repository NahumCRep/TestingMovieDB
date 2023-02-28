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
    // const [pagination, setPagination] = useState({
    //     page: 1,
    //     totalPages: 1
    // })

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
            let queryParams = { api_key, page }

            if(searchValue){
                queryUrl = apiRoutes.search
                queryParams.query = searchValue
            }else{
                queryUrl = apiRoutes.movies
                queryParams.with_genres = category
            }

            const movies = await MovieApi.get(queryUrl, {params: queryParams})
       
            // setPagination({
            //     page: movies.data.page,
            //     totalPages: movies.data.total_pages
            // })

            const pagination = {
                page: movies.data.page,
                totalPages: movies.data.total_pages
            }

            console.log(pagination)

            setMovieData({
                data: movies.data.results,
                pagination: pagination,
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

    const markMovieAsFavorite = async (movie, user) => {
        try {
            const resp = await MovieApi.post(`/account/${user.id}/favorite`, 
                        {
                            media_type: movie.type, 
                            media_id:   movie.id, 
                            favorite:   movie.fav
                        },
                        {params:{
                            api_key, 
                            session_id: user.session_id
                        }},
                    )
        } catch (error) {
            console.log('MMAF-E', error)
        }
    }

    const getFavoriteMovies = async (user) => {
        setMovieData({
            ...movieData,
            isLoading:true
        })

        try {
            const { data } = await MovieApi.get(`/account/${user.id}/favorite/movies`, 
            {params:{api_key, session_id: user.session_id}})

            setMovieData({
                data: data.results,
                isLoading: false,
                hasError: null
            })

        } catch (error) {
            console.log('GFM-E', error)
            setMovieData({
                data:null,
                isLoading:false,
                hasError: 'Error al obtener lista de favoritos'
            })
        }
    }

   

    return {
        ...movieData,
        categories,
        getMovie,
        getMovies,
        getCategories,
        getFavoriteMovies,
        markMovieAsFavorite
    }
}
