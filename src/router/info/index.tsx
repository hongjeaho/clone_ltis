import AuthenticationLayout from '@/layout/AuthenticationLayout'
import Info from '@/views/info/Info'

export default [
  {
    path: 'info',
    element: <AuthenticationLayout />,
    Children: [
      {
        path: '',
        element: <Info />,
      },
    ],
  },
]
