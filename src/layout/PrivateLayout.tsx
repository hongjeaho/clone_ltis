import { type PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoginSelector, userAuthoritySelector } from '@/store/user'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { type BasicAuthority } from '@/model/basicAuthority'
import { alertMessageState } from '@/store/message'

type Role = 'DECISION' | 'IMPLEMENT' | 'ADMIN'

interface Props extends PropsWithChildren {
  roles: Role[]
}

const PrivateLayout: React.FC<Props> = ({ roles, children }) => {
  const navigate = useNavigate()
  const isLogin = useRecoilValue<boolean>(isLoginSelector)
  const userAuthority = useRecoilValue<BasicAuthority[]>(userAuthoritySelector)
  const setAlertMessage = useSetRecoilState(alertMessageState)

  const handlerGoToHome = () => {
    navigate('/login')
  }

  useEffect(() => {
    let message = null
    if (!isLogin) {
      message = '로그인이 필요한 페이지입니다.'
    }
    console.log('===')
    console.log(userAuthority)

    // const roleCheck = userAuthority?.map(authority => authority.role as Role)?.some(value => roles.includes(value)) ?? false
    // if (!roleCheck) {
    //   message = '접근 권한이 없습니다.'
    // }

    if (message !== null) {
      setAlertMessage({ message, onCallBack: handlerGoToHome })
    }
  }, [isLogin])

  if (!isLogin) {
    return null
  }

  return <div>{children}</div>
}

export default PrivateLayout
