import AcceptanceDecision from '@/views/land/AcceptanceDecision'
import Charge from '@/views/land/Charge'
import Committee from '@/views/land/Committee'
import Compensation from '@/views/land/Compensation'
import Procedure from '@/views/land/Procedure'

export default [
  {
    path: 'land',
    children: [
      {
        index: true,
        path: 'compensation',
        element: <Compensation />,
        meta: { title: '토지수용제도 및 보상금 안내' },
      },
      {
        path: 'acceptanceDecision',
        element: <AcceptanceDecision />,
        meta: { title: '수용재결 안내' },
      },
      {
        path: 'procedure',
        element: <Procedure />,
        meta: { title: '수용재결 절차안내' },
      },
      {
        path: 'committee',
        element: <Committee />,
        meta: { title: '서울지방토지 수용위원회' },
      },
      {
        path: 'charge',
        element: <Charge />,
        meta: { title: '구별 담당현황' },
      },
    ],
  },
]
