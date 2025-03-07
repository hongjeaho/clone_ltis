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
        path: '',
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

export default createBrowserRouter(router)
