import React,  {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks'

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleMenu = () => {
    setIsNavOpen(!isNavOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='nav-container'>
        <NavLink to={'/'} className='nav-logo'>
          MovieApp
        </NavLink>
        <ul className={`nav-links ${isNavOpen ? 'nav-open':''}`}>
          {
            user.status === 'authenticated'
            ? (
              <>
              <li>
                <NavLink to={'/favorites'}>
                  Mis Favoritos
                </NavLink>
              </li>
              <li>
                <button className='nav-logout-btn' onClick={handleLogout}>
                  Logout
                </button>
              </li>
              </>
            )
            : <NavLink to={'login'} >Login</NavLink>
          }
        </ul>

        <button 
          onClick={handleMenu} 
          className={`burguer ${isNavOpen ? 'burguer-open':''}`}>
            <div className='burguer-bar'></div>
            <div className='burguer-bar'></div>
            <div className='burguer-bar'></div>
        </button>
    </div>
  )
}
