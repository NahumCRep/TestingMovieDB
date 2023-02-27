import React, { useEffect } from 'react'
import { PageLayout } from '../components/layouts/PageLayout'
import { useParams, useLocation } from 'react-router-dom'
import { useMovie, useAuth } from '../hooks'
import { posterURL500, backdropURL } from '../api/config'

export const DetailsPage = () => {
  const params = useParams()
  const location = useLocation()
  const { user } = useAuth()
  const { 
    data,
    getMovie, 
    isLoading,
    markMovieAsFavorite
  } = useMovie()

  const queryParams = new URLSearchParams(location.search)
  const favoriteMarked = queryParams.get('fav')

  const handleFavMovie = () => {
    markMovieAsFavorite({
      type:'movie',
      id: data.id,
      fav: favoriteMarked ? false : true
    }, user)
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
                  <img src={`${backdropURL}/${data.backdrop_path}`} alt={data.original_title} />
                </figure>
                <div className='movie-info'>

                  <h1>{data.original_title}</h1>
                  <div className='movie-info-flex'>
                    <p><b>Año:</b> {new Date(data.release_date).getFullYear()}</p>
                    <p>
                      <b>Duracion:</b>
                      {` ${Math.trunc(data.runtime / 60)}h ${ data.runtime - (60 * (Math.trunc(data.runtime / 60)))} min`}
                    </p> 
                  </div>

                  
                  <div className='movie-genres'>
                    {
                      data.genres.map(genre => <span key={genre.id}>{genre.name}</span>)
                    }
                  </div>
                  
                  <p>{data.overview}</p>

                  <button onClick={handleFavMovie} className="btn-favorite">
                    {
                      favoriteMarked
                      ? 'quitar de favoritos'
                      : 'agregar a favoritos'                  
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
