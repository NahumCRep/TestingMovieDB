import { useState, useEffect } from 'react'
import { MovieApi } from '../api'
import { api_key  }  from '../api/config'

export const useAuth = () => {
    const [user , setUser] = useState({
        session_id:null, 
        id: null, 
        status:'not-authenticated'
    })
    const [loginStatus, setLoginStatus] = useState({
        isLoading: true,
        hasError: null
    })


    const login = async (loginData) => {
        setLoginStatus({
            ...loginStatus,
            isLoading: true
        })

        try {
            const resp = await MovieApi.get('/authentication/token/new', { params: { api_key } })
            const token = resp.data.request_token

            window.location.replace(`https://www.themoviedb.org/authenticate/${token}?api_key${api_key}&redirect_to=http://www.localhost:3000/approved`)
                 
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        setUser({
            session_id:null, 
            id: null, 
            status:'not-authenticated'
        })

        localStorage.clear()
    }

    const confirmLogin = async (token) => {
        try {
            const session = await MovieApi.post(`/authentication/session/new?api_key=${api_key}`,
                        {request_token: token})
            
            const session_id = session.data.session_id
         
            const account = await MovieApi.get('/account', {params:{api_key, session_id}})
            const userId = account.data.id
            
            const user = {
                id: userId,
                session_id: session_id,
                status: 'authenticated'
            }

            localStorage.setItem('user', JSON.stringify(user))
                      
            return { ok:true }
        } catch (error) {
            console.log('confirm login',error)
            return {ok:false}
        }
    }

    const getUser = () => {
        const userData = localStorage.getItem('user')
        if(!userData){
            return {
                session_id:null, 
                id: null, 
                status:'not-authenticated'
            }
        }
        const user = JSON.parse(userData)
        return user      
    }

    useEffect(() => {
        if(typeof window !== undefined){
            const userData = localStorage.getItem('user')
            if(userData){
                const user = JSON.parse(userData)
                setUser(user)
            }
        } 
    },[])

    return {
        user,
        login,
        logout,
        confirmLogin,
        getUser,
    }
}