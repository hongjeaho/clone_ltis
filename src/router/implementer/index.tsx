import AuthenticationLayout from '@/layout/AuthenticationLayout'
import ApplicationList from '@/views/implementer/ApplicationList'

export default [
  {
    path: 'implementer',
    element: <AuthenticationLayout />,
    children: [
      {
        path: 'application',
        element: <ApplicationList />,
        meta: { title: 'LTIS 정보 입력' },
      },
    ],
  },
]
