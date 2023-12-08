import axios from "axios"

// const { REACT_APP_API_URL } = process.env
const REACT_APP_API_URL = 'http://localhost:8080'
const baseURL = REACT_APP_API_URL || 'http://localhost:8080'

const api = axios.create({
    baseURL
})

api.interceptors.request.use(config => {
try {
    config.params = config.params || {}
} catch (error) {}

return config
})

export { api, baseURL }
