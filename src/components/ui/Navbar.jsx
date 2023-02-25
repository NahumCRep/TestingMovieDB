import React,  {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../../styles/components/navbar.css'

export const Navbar = () => {
  const [search, setSearch] = useState('')
  const [isNavOpen, setIsNavOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${search}`)
  }

  const handleMenu = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <div className='nav-container'>
        <NavLink to={'/'} className='nav-logo'>
          MovieApp
        </NavLink>
        <ul className={`nav-links ${isNavOpen ? 'nav-open':''}`}>
          <form method='GET' onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={search} 
              placeholder='buscar...'
              onChange={e => setSearch(e.target.value)} 
            />
            <button type='submit'>buscar</button>
          </form>
          <NavLink to={'/favorites'}>
            Mis Favoritos
          </NavLink>
        </ul>

        <button 
          onClick={handleMenu} 
          className='burguer'>
            M
        </button>
    </div>
  )
}
