import InputTextBox from '@components/common/form/InputTextBox'
import { Button, CssBaseline } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

import { useLogin } from '@/api/authority-api/authority-api'
import Loading from '@/components//common/Loading'
import { useShowAlertMessage } from '@/store/message'
import { userState } from '@/store/user'

import styles from './Login.module.css'

interface FromProps {
  id: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const setCustomer = useSetRecoilState(userState)
  const showAlertMessage = useShowAlertMessage()

  const { mutate, isPending } = useLogin({
    mutation: {
      onSuccess: data => {
        setCustomer({ ...data })
        navigate('/')
      },
      onError: error => {
        const { code } = error
        if (code === 'ERR_NETWORK') {
          showAlertMessage('서버 연결이 불안전 합니다. 나중에 다시 시도해 주세요')
          return
        }

        showAlertMessage('아이디 또는 비밀번호를 확인해 주세요')
      },
    },
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FromProps>({
    defaultValues: {
      id: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FromProps> = async data => {
    const { id, password } = data
    mutate({
      data: {
        id,
        password,
      },
    })
  }

  return (
    <div className={styles.base}>
      <Loading isShow={isPending} message="로그인 시도중 입니다." />
      <div className={styles.logo}>
        <h1>
          <Link to="/" title="심의지원 시스템">
            <span>심의지원 시스템</span>
          </Link>
        </h1>
      </div>
      <CssBaseline />

      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.title}>
            <h3>LOGIN</h3>
          </div>
          <div>
            <div>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
                className={styles.form}
              >
                <div>
                  <InputTextBox
                    id="id"
                    label="id"
                    type="text"
                    register={register}
                    error={errors?.id}
                    rules={{
                      required: '아이디를 입력하세요.',
                      minLength: {
                        value: 4,
                        message: '아이디를 4자리 이상이어야 합니다.',
                      },
                    }}
                  />
                  <Box height={5} />
                  <InputTextBox
                    id="password"
                    label="password"
                    type="password"
                    register={register}
                    error={errors?.password}
                    rules={{
                      required: '비밀번호를 확인해 주세요.',
                      minLength: {
                        value: 5,
                        message: '비밀번호는 5자리 이상이어야 합니다.',
                      },
                    }}
                  />
                </div>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ height: '100%' }}
                  >
                    로그인
                  </Button>
                </div>
              </Box>
            </div>

            <Box
              display={'pixed'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ backgroundColor: '#fff' }}
            >
              <Button>회원가입</Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
