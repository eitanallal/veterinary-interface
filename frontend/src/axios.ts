import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // your base URL
  timeout: 5000, // optional, set a timeout for requests
  headers: {
    'Content-Type': 'application/json', // set default content type
  },
})

export default axiosInstance
