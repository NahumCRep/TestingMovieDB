import React from 'react'
import { Link } from 'react-router-dom'
import { posterURL500 } from '../../api/config'
import defaultImage from '../../assets/images/default.webp'

export const Card = ({ movie, favorite = false }) => {
    return (
        <div className='card-container'>
            <Link to={favorite ? `/details/${movie.id}?fav=true`:`/details/${movie.id}`}>
                <figure>
                    <img
                        src={
                            movie.poster_path 
                            ? `${posterURL500}/${movie.poster_path}`
                            : defaultImage
                        }
                        alt={`${movie.title}`} />
                </figure>
                <div className='card-body'>
                    <h2>{movie.title}</h2>
                </div>
            </Link>
        </div>
    )
}
