import React, { useEffect } from 'react'
import '../styles/detailspage.css'
import { PageLayout } from '../components/layouts/PageLayout'
import { useParams } from 'react-router-dom'
import { useMovie } from '../hooks'
import { posterURL500 } from '../api/config'

export const DetailsPage = () => {
  const params = useParams()
  const { 
    data,
    favoriteMovies,  
    getMovie, 
    isLoading, 
    addMovieToFavorites, 
    deleteMovieToFavorites
  } = useMovie()

  const handleFavMovie = () => {
    // falto corregir el funcionamiento de deleteMovie..
    if(favoriteMovies.includes(data.id)){
      deleteMovieToFavorites(data.id)
    }else{
      addMovieToFavorites(data.id)
    }
  }

  useEffect(() => {
    getMovie(params.id)
  }, [params.id])

  return (
    <PageLayout>
      <div className='details-page-container'>
        {
          isLoading
            ? <p>cargando...</p>
            : (
              <>
                <figure className='movie-img'>
                  <img src={`${posterURL500}/${data.poster_path}`} alt={data.original_title} />
                </figure>
                <div className='movie-info'>

                  <h1>{data.original_title}</h1>
                  
                  <p>Año {new Date(data.release_date).getFullYear()}</p>
                  
                  <div className='movie-genres'>
                    {
                      data.genres.map(genre => <span>{genre.name}</span>)
                    }
                  </div>
                  
                  <p>{data.overview}</p>

                  <button onClick={handleFavMovie} className="btn-favorite">
                    {
                      favoriteMovies.includes(data.id) 
                      ? 'Eliminar de Favoritos'
                      : 'Agregar a Favoritos'
                    }
                  </button>
                </div>
              </>
            )
        }
      </div>
    </PageLayout>
  )
}
