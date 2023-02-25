import axios from 'axios'
import { apiUrl, authUrl } from './config'

export const MovieApi = axios.create({
  baseURL: apiUrl   
})

export const AuthApi = axios.create({
  baseURL: authUrl
})

// export default MovieApi