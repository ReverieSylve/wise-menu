import axios from 'axios'
import { useLoaderStore } from '../stores/loader'

export const useAxios = () => {
  const { pending, done } = useLoaderStore()

  const instance = axios.create({
    baseURL: 'api/'
  })

  instance.interceptors.request.use(
    config => {
      if (!config.hideLoader) pending()
      return config
    },
    error => {
      if (!error.config.hideLoader) done()
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    response => {
      if (!response.config.hideLoader) done()
      return response
    },
    error => {
      const response = error.response
      if (!response.config.hideLoader) done()
      return Promise.reject(error)
    }
  )

  return instance
}
