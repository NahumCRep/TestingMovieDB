import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMovie } from '../../hooks'
import '../../styles/pagination.css'

export const Pagination = () => {
    const { page, totalPages } = useMovie()
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const handleNextPage = () => {
        if(pathname.includes('page')){
            // idea: usar regex para reemplazar page con page=nueva-Pagina
        }else{
            navigate(`${pathname}?page=${page + 1}`)   
        }
    }

    const handlePrevPage = () => {
        // realizar la misma operacion de handleNext pero verificando que el 
        // valor de page no sea menor a cero
    }


    return (
        <div className='pagination-container'>
            <button onClick={handlePrevPage}>prev</button>
            <span>{page + ' de ' + totalPages}</span>
            <button onClick={handleNextPage}>next</button>
        </div>
    )
}
