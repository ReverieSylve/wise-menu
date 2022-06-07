import axios from 'axios'
import { useLoaderStore } from '../stores/loader'
import { useToastersStore } from '../stores/toasters'

export const useAxios = () => {
  const { pending, done } = useLoaderStore()
  const { setSuccessToaster, setErrorToaster } = useToastersStore()

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
      const { config } = response
      if (!config.hideLoader) done()
      if (config.successMessage) setSuccessToaster(config.successMessage)
      return response
    },
    error => {
      const { config } = error.response
      if (!config.hideLoader) done()
      setErrorToaster(config.errorMessage || error.message)
      return Promise.reject(error)
    }
  )

  return instance
}
