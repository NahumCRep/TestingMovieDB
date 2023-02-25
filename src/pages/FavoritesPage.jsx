import React, { useEffect } from 'react'
import { PageLayout } from '../components/layouts/PageLayout'
import { useMovie } from '../hooks'


export const FavoritesPage = () => {
    const { data, isLoading, favoriteMovies, getFavorites } = useMovie()

    useEffect(() => {
        console.log(favoriteMovies)
        // llamar a getFavorites para establecer los resultados en data
        getFavorites()
    }, [])

    return (
        <PageLayout>
            {/* <section className='grid-section'>
                {
                    data &&
                    data.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))
                }
            </section> */}
        </PageLayout>
    )
}
