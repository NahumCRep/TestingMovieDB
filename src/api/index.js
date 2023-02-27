import axios from 'axios'
import { apiUrl, authUrl } from './config'

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "tapplication/json",
  },
};

export const MovieApi = axios.create({
  baseURL: apiUrl
})

export const AuthApi = axios.create({
  baseURL: authUrl,
  https: config
})

// export default MovieApi