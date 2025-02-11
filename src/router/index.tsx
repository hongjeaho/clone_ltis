import React from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import BaseLayout from '@/components/layout/BaseLayout'

import land from './land'
import Home from '@/views/Home'
import info from './info'
import Login from '@/views/Login'
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
      {
        path: '/login',
        element: <Login />,
      },
      ...info,
      ...land,
    ],
    errorElement: <ErrorPage />,
  },
]

export default createBrowserRouter(router)
