import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { useShowAlertMessage } from '@/store/message'
import { userState } from '@/store/user'

const AUTHORIZATION = 'authorization'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
})

export const useAxiosInstance = () => {
  const showAlertMessage = useShowAlertMessage()
  const setCustomer = useSetRecoilState(userState)

  const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem(AUTHORIZATION) as string | undefined
    if (token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    const { headers } = response

    if (headers[AUTHORIZATION] !== undefined) {
      localStorage.setItem(AUTHORIZATION, headers[AUTHORIZATION])
    }
    return response
  }

  const onError = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { headers } = error.response

        const isTokenExpired = headers['x-token-expired']
        if (isTokenExpired === 'true') {
          showAlertMessage('토큰이 만료 되었습니다.')
          localStorage.removeItem(AUTHORIZATION)
          setCustomer(null)
        }
      }
    }

    return Promise.reject(error)
  }

  useEffect(() => {
    axiosInstance.interceptors.request.use(onRequest)
    axiosInstance.interceptors.response.use(onResponse, onError)
  }, [onRequest, onResponse, onError])
}

export const request = <T>(options: AxiosRequestConfig): Promise<T> => {
  const config = {
    ...options,
  }

  if (config.method?.toUpperCase() === 'GET') {
    config.paramsSerializer = paramObj => {
      const queryString = new URLSearchParams()
      for (const [key, value] of Object.entries(flatObject(paramObj))) {
        if (value !== null && value !== undefined && value !== '') {
          const addKey = key.replace(/\[.+\]/, '')
          queryString.append(addKey, value)
        }
      }
      return queryString.toString()
    }
  }

  const source = axios.CancelToken.source()
  const promise = axiosInstance({ ...config, cancelToken: source.token }).then(({ data }) => data)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  promise.cancel = () => {
    source.cancel('Query was cancelled by React Query')
  }

  return promise
}

const flatObject = (object: Record<string, any>, prefix = '') => {
  return Object.keys(object).reduce((carry: Record<string, any>, key: string) => {
    const pre = prefix ? prefix + `.${key}` : ''

    if (Array.isArray(object[key])) {
      carry = object[key].reduce((array: Record<string, any>, value: any, index: number) => {
        array[(pre || key) + `[${index}]`] = value
        return array
      }, carry)
    } else if (object[key] && typeof object[key] === 'object') {
      Object.assign(carry, flatObject(object[key], pre || key))
    } else {
      carry[pre || key] = object[key]
    }

    return carry
  }, {})
}

export type ErrorType<Error> = AxiosError<Error>
