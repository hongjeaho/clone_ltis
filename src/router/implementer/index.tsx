import AuthenticationLayout from '@/layout/AuthenticationLayout'
import ImplementerApplication from '@/views/implementer/ImplementerApplication'
import ImplementerDetail from '@/views/implementer/ImplementerDetail'
import ImplementerWrite from '@/views/implementer/ImplementerWrite'

export default [
  {
    path: 'implementer',
    element: <AuthenticationLayout />,
    children: [
      {
        path: 'application',
        element: <ImplementerApplication />,
        meta: { title: 'LTIS 정보 입력' },
      },
      {
        path: 'application/:judgSeq',
        element: <ImplementerDetail />,
        meta: { title: 'LTIS 정보 입력' },
      },
      {
        path: 'application/:judgSeq/write',
        element: <ImplementerWrite />,
        meta: { title: 'LTIS 정보 입력 등록' },
      },
    ],
  },
]
