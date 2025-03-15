import styled from '@emotion/styled/macro'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { alertMessageState } from '@/store/message'
import { isLoginSelector, userAuthoritySelector } from '@/store/user'

const Base = styled.div`
  height: 100%;
  margin: 0;
`
const menuAuthority: Record<string, string[]> = {
  implementer: ['IMPLEMENTER'],
  decision: ['DECISION'],
}

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

    const path = location.pathname.split('/')[1] ?? 'implementer'
    const authority: string[] = menuAuthority[`${path}`] ?? []
    const roleCheck = userAuthority?.map(authority => authority.role)?.some(value => authority.includes(value)) ?? false

    if (authority.length > 0 && !roleCheck) {
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
