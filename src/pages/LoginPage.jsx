import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks'
import '../styles/pages/login-page.css'

export const LoginPage = () => {
    const [formInputs, setFromInputs] = useState({
        username: '',
        password: ''
    })
    const { login } = useAuth()


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formInputs)
        login(formInputs)
    }

    const handleInputChange = ({ target }) => {
        setFromInputs({
            ...formInputs,
            [target.name]: target.value
        })
    }

    return (
        <div className='login-page-container'>
            <form
                method='POST'
                onSubmit={handleSubmit}
                className='login-form'
            >
                <h1>Login</h1>
                <label htmlFor='username'>
                    Usuario
                    <input
                        type={'text'}
                        name={'username'}
                        value={formInputs.username}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label htmlFor='password'>
                    Contrasena
                    <input
                        type={'password'}
                        name='password'
                        value={formInputs.password}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <button type='submit'>aceptar</button>
            </form>
        </div>
    )
}
