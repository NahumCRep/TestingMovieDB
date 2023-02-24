import axios from 'axios'
import { apiUrl } from './config'

const MovieApi = axios.create({
  baseURL: apiUrl   
})

export default MovieApi