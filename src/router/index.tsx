import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import BaseLayout from '@/layout/BaseLayout'
import ErrorPage from '@/views/ErrorPage'
import Home from '@/views/Home'
import Login from '@/views/login/Login'

import implementer from './implementer'
import land from './land'

const router: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      ...land,
      ...implementer,
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]

const options = {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
}

export default createBrowserRouter(router, options)
