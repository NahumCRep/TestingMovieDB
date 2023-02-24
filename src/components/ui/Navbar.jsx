import React,  {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../../styles/navbar.css'

export const Navbar = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${search}`)
    // console.log(searchRef.current.value)
  }

  return (
    <div className='nav-container'>
        <NavLink to={'/'} className='nav-logo'>
          MovieApp
        </NavLink>
        <ul className='nav-links'>
          <form method='GET' onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={search} 
              placeholder='buscar...'
              onChange={e => setSearch(e.target.value)} 
            />
            <button type='submit'>buscar</button>
          </form>
          <NavLink>
            Mis Favoritos
          </NavLink>
        </ul>
    </div>
  )
}
