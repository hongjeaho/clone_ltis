import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

const AUTHORIZATION = 'authorization'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
})

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem(AUTHORIZATION) as string | undefined
  if (token !== undefined) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { succeeded, message } = response.data
  const { headers } = response

  const isTokenExpired = headers['x-token-expired']
  if (isTokenExpired === 'true') {
    console.log('만료 처리')
    localStorage.removeItem(AUTHORIZATION)
  } else if (succeeded) {
    throw new Error(message)
  }

  if (headers[AUTHORIZATION] !== undefined) {
    localStorage.setItem(AUTHORIZATION, headers[AUTHORIZATION])
  }

  return response
}

axiosInstance.interceptors.request.use(onRequest)
axiosInstance.interceptors.response.use(onResponse)

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
