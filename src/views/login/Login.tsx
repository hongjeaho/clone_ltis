import { userState } from '@/store/user'
import { Button, CssBaseline } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import Box from '@mui/material/Box'
import styles from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import InputBox from '@/commonComponents/form/InputBox'
import { useLogin } from '@/api/authority-api/authority-api'
import { useShowAlertMessage } from '@/store/message'

interface FromProps {
  id: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const setCustomer = useSetRecoilState(userState)
  const showAlertMessage = useShowAlertMessage()

  const { mutate } = useLogin({
    mutation: {
      onSuccess: data => {
        setCustomer({ ...data })
        navigate('/')
      },
      onError: error => {
        console.error(error.response?.data)
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
    console.log(data)
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
              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className={styles.form}>
                <div>
                  <InputBox
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
                  <InputBox
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
                  <Button type="submit" variant="contained" color="primary" size="large" fullWidth sx={{ height: '100%' }}>
                    로그인
                  </Button>
                </div>
              </Box>
            </div>

            <Box display={'pixed'} justifyContent={'center'} alignItems={'center'} sx={{ backgroundColor: '#fff' }}>
              <Button>회원가입</Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
