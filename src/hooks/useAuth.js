import { useState } from 'react'
import { api_key } from '../api/config'
import { MovieApi , AuthApi} from '../api'

export const useAuth = () => {
    const [user, setUser] = useState({
        session_id: null,
        status: 'not-authenticated',
    })
    const [loginStatus, setLoginStatus] = useState({
        isLoading: true,
        hasError: null
    })
    const [token, setToken] = useState()

    const login = async (loginData) => {
        setLoginStatus({
            ...loginStatus,
            isLoading: true
        })

        try {
            const resp = await MovieApi.get('/authentication/token/new', { params: { api_key } })
            const token = resp.data.request_token

            window.location.replace(`https://www.themoviedb.org/authenticate/${token}?api_key${api_key}&redirect_to=http://www.localhost:3000/approved`)
             
               
            

            const body = {
                ...loginData,
                request_token: token
            }

            console.log(body)
            // const loginResp = await MovieApi.post('/authentication/token/validate_with_login', {
            //     params: {api_key},
            //     body: body
            // })
            const loginResp = await MovieApi.post('/authentication/session/new', {
                params: { api_key },
                body: { request_token: token }
            })

            console.log(loginResp)
        } catch (error) {
            console.log(error)
        }
    }

    const confirmLogin = async (token) => {
        try {
            // const authorization = await fetch(`https://www.themoviedb.org/authenticate/${token}?api_key${api_key}`, {
            //     method: 'GET',
            //     headers: {
            //         'Access-Control-Allow-Origin': true,
            //         'Content-Type': 'application/json',
            //         "Accept": "application/json"
            //     }
            // })

            const resp = await AuthApi.post(`/authentication/session/new?api_key=${api_key}`, 
                        {header: {'Access-Control-Allow-Origin': true}, 
                        body:{refresh_token: token}})

            console.log(resp)

        } catch (error) {
            console.log('confirm login',error)
        }
    }

    return {
        user,
        login,
        confirmLogin
    }
}
