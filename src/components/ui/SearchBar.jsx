import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

export const SearchBar = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch('')
        navigate(`/search/${search}`)
    }
    

    return (
        <form method='GET' onSubmit={handleSubmit} className='searchbar-form'>
            <input
                type="text"
                value={search}
                placeholder='buscar...'
                onChange={e => setSearch(e.target.value)}
            />
            <button type='submit'>
                <FaSearch />
            </button>
        </form>
    )
}
