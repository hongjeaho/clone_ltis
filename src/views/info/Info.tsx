import { userState } from '@/store/user'
import { useRecoilValue } from 'recoil'

const Info: React.FC = () => {
  const customer = useRecoilValue(userState)

  return (
    <>
      <h1>info</h1>
      hello {customer?.name}
    </>
  )
}

export default Info
