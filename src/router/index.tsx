import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import BaseLayout from '@/layout/BaseLayout'

import land from './land'
import Home from '@/views/Home'
import info from './info'
import Login from '@/views/login/Login'
import Detail from '@/views/Detail'
import ErrorPage from '@/views/ErrorPage'

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
