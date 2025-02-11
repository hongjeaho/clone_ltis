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
        label: '토지수용제도 및 보상금 안내',
      },
      {
        path: 'acceptanceDecision',
        element: <AcceptanceDecision />,
        label: '수용재결 안내',
      },
      {
        path: 'procedure',
        element: <Procedure />,
        label: '수용재결 절차안내',
      },
      {
        path: 'committee',
        element: <Committee />,
        label: '서울지방토지 수용위원회',
      },
      {
        path: 'charge',
        element: <Charge />,
        label: '구별 담당현황',
      },
    ],
  },
]
