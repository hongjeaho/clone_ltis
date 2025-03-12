import styled from '@emotion/styled/macro'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { getMenuAuthority } from '@/components/base/menu/menuData'
import { alertMessageState } from '@/store/message'
import { isLoginSelector, userAuthoritySelector } from '@/store/user'

const Base = styled.div`
  height: 100%;
  margin: 0;
`

const AuthenticationLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const isLogin = useRecoilValue<boolean>(isLoginSelector)
  const userAuthority = useRecoilValue(userAuthoritySelector)
  const setAlertMessage = useSetRecoilState(alertMessageState)

  const handlerGoToHome = () => {
    navigate('/login')
  }

  useEffect(() => {
    let message = null
    if (!isLogin) {
      message = '로그인이 필요한 페이지입니다.'
    }

    const menuAuthority = getMenuAuthority(location.pathname)
    const roleCheck = userAuthority?.map(authority => authority.role)?.some(value => menuAuthority.includes(value)) ?? false

    console.log('============[menuAuthority]====================')
    console.log(menuAuthority)
    console.log('============[userAuthority]====================')
    console.log(userAuthority)

    if (!roleCheck) {
      message = '접근 권한이 없습니다.'
    }

    if (message !== null) {
      setAlertMessage({ message, onCallBack: handlerGoToHome })
    }
  }, [isLogin])

  if (!isLogin) {
    return null
  }

  return (
    <Base>
      <Outlet />
    </Base>
  )
}

export default AuthenticationLayout
