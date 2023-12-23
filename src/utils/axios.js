import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true // このオプションを追加する
})
