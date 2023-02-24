import React from 'react'
import '../../styles/pagelayout.css'
import { Navbar } from '../ui'

export const PageLayout = ({children}) => {
  return (
    <div>
        <Navbar />
        <main className='main-content'>
            {children}
        </main>
    </div>
  )
}
