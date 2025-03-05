import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import BaseLayout from '@/layout/BaseLayout'
import Detail from '@/views/Detail'
import ErrorPage from '@/views/ErrorPage'
import Home from '@/views/Home'
import Login from '@/views/login/Login'

import info from './info'
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
      {
        path: '/detail/:id',
        element: <Detail />,
      },
      ...info,
      ...land,
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]

export default createBrowserRouter(router)
