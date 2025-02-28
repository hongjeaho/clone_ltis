import Info from '@/views/info/Info'
import PrivateLayout from '@/layout/PrivateLayout'

export default [
  {
    path: 'info',
    element: (
      <PrivateLayout roles={['ADMIN']}>
        <Info />
      </PrivateLayout>
    ),
  },
]
