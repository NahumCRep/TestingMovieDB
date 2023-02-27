import React, { useEffect } from 'react'
import { PageLayout } from '../components/layouts/PageLayout'
import { Card } from '../components/ui'
import { useMovie, useAuth } from '../hooks'


export const FavoritesPage = () => {
    const { data, isLoading, getFavoriteMovies } = useMovie()
    const { user, getUser } = useAuth()

    useEffect(() => {
        if(!user.id){
            const userInfo = getUser()
            getFavoriteMovies(userInfo)
        }
    }, [])

    return (
        <PageLayout>
            <section className='grid-section'>
                {
                    isLoading
                        ? <p>cargando...</p>
                        : (
                            data &&
                            data.map(movie => (
                                <Card key={movie.id} movie={movie} favorite={true} />
                            ))
                        )
                }
            </section>
        </PageLayout>
    )
}
