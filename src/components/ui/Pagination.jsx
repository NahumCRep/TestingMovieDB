import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const Pagination = ({pages}) => {
    const [disabled, setDisabled] = useState({prev: false, next: false})
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { page, totalPages } = pages

    const handleNextPage = () => {
        if(page < totalPages){
            navigate(`${pathname}?page=${page + 1}`) 
        }
    }

    const handlePrevPage = () => {
        if(page > 1){
            navigate(`${pathname}?page=${page - 1}`) 
        }
    }

    useEffect(() => {
        if( page >= totalPages){
            setDisabled({prev: false,next: true})
        }
        
        if(page <= 1){
            setDisabled({prev: true, next: false})
        }
        
        if(page > 1 && page < totalPages){
            setDisabled({prev: false, next: false})
        }
    },[page, totalPages])


    return (
        <div className='pagination-container'>
            <button 
                className={`${disabled.prev ? 'pagbtn-disabled' : ''}`}
                onClick={handlePrevPage}
                disabled={disabled.prev}
            >
                prev
            </button>
            <span>{pages.page + ' de ' + pages.totalPages}</span>
            <button
                className={`${disabled.next ? 'pagbtn-disabled' : ''}`} 
                onClick={handleNextPage}
                disabled={disabled.next}
            >
                next
            </button>
        </div>
    )
}
