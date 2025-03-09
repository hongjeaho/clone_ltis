import AuthenticationLayout from '@/layout/AuthenticationLayout'
import Application from '@/views/implementer/Application'

export default [
  {
    path: 'implementer',
    element: <AuthenticationLayout />,
    children: [
      {
        path: 'application',
        element: <Application />,
        meta: { title: 'LTIS 정보 입력' },
      },
    ],
  },
]
