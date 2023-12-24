import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_BASE_URL,
  headers: {
    ContentType: 'application/json',
    Accept: 'application/json'
  },
  withCredentials: true // このオプションを追加する
})
