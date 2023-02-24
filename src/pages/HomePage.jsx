import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useMovie } from '../hooks'
import { PageLayout } from '../components/layouts/PageLayout'
import { Pagination, Card } from '../components/ui'
import '../styles/homepage.css'

export const HomePage = () => {
    const {data, getMovies, getCategories} = useMovie()
    const {category, search, page} = useParams()
    const location = useLocation()

    useEffect(() => {
        console.log(location)
        getMovies({searchValue: search, page: page})
        getCategories()
    }, [search, category, page])

    return (
        <PageLayout>
            <h1>Home</h1>
            <section className='grid-section'>
                {
                    data && 
                    data.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))
                }
            </section>
            {/* no terminado */}
            {/* <Pagination currentPage={page || 1} /> */}
        </PageLayout>
    )
}
