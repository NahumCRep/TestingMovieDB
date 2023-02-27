import React, { useEffect, useState } from 'react'
import { SearchBar } from '../ui'
import { useMovie } from '../../hooks'
import { Link, useLocation } from 'react-router-dom'

export const CategorySection = () => {
    const { categories, getCategories } = useMovie()
    const [isCatgOpen, setIsCatgOpen] = useState()
    const { pathname } = useLocation()
    
    const handleCategoriesMenu = () => {
        setIsCatgOpen(!isCatgOpen)
    }

    useEffect(() => {
        getCategories()
    },[])

    useEffect(() => {
        setIsCatgOpen(false)
    },[pathname])

    return (
        <section className='categories-section'>
            <SearchBar />
            <div>
                <button
                    className='category-menu-btn'
                    onClick={handleCategoriesMenu}
                >
                    {
                        isCatgOpen
                            ? 'cerrar'
                            : 'categorias'
                    }
                </button>
                <ul className={`categories-container ${isCatgOpen ? 'category-menu-open':''}`}>
                    {
                        categories && 
                        categories.map(category => (
                            <li key={category.id} className='category-link'>
                                <Link to={`/category/${category.id}`}>{category.name}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}
