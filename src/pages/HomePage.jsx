import { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useMovie } from '../hooks'
import { PageLayout } from '../components/layouts/PageLayout'
import { Pagination, Card } from '../components/ui'
import { CategorySection } from '../components/sections'

export const HomePage = () => {
    const { data, pagination, getMovies } = useMovie()
    const { category, search } = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const page = queryParams.get('page')

    useEffect(() => {
        getMovies({ searchValue: search, category: category, page: page })
    }, [search, category, page])

    return (
        <PageLayout>
            <div className='home-page-container'>
                <div className='home-categories-section'>
                    <CategorySection />
                </div>
                <div className='home-body'>
                    <section className='grid-section'>
                        {
                            data &&
                            data.map(movie => (
                                <Card key={movie.id} movie={movie} />
                            ))
                        }
                    </section>
                    <Pagination pages={pagination ? pagination : {page:1, totalPages:1}} />
                </div>
            </div>
        </PageLayout>
    )
}
