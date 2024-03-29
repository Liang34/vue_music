import axios from 'axios'

const fetch = axios.create({
  withCredentials: true,
  timeout: 50000,
  baseURL: 'http://120.25.239.32:3000'
})
fetch.interceptors.request.use(
  async (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

fetch.interceptors.response.use(
  (axiosRes) => {
    if (axiosRes.data.result !== 0) {
      return axiosRes.data
    } else {
      return axiosRes.data
    }
  },
  (axiosErr) => {
    return axiosErr.response
  }
)

export default fetch
