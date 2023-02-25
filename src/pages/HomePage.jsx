import { useEffect } from 'react'
import { useParams, useLocation} from 'react-router-dom'
import { useMovie } from '../hooks'
import { PageLayout } from '../components/layouts/PageLayout'
import { Pagination, Card } from '../components/ui'
import '../styles/pages/homepage.css'

export const HomePage = () => {
    const {data, getMovies, getCategories} = useMovie()
    const {category, search} = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page')

    useEffect(() => {
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
            <Pagination currentPage={page || 1} />
        </PageLayout>
    )
}
