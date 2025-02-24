import { customerState } from '@/store/customer'
import { Button, CssBaseline } from '@mui/material'
import { useSetRecoilState } from 'recoil'
import Box from '@mui/material/Box'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { type SubmitHandler, useForm } from 'react-hook-form'
import InputBox from '@/components/base/form/InputBox'

interface FromProps {
  id: string
  password: string
}

const Login: React.FC = () => {
  const setCustomer = useSetRecoilState(customerState)

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
    setCustomer({ name: '' })
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
                        value: 8,
                        message: '비밀번호는 8자리 이상이어야 합니다.',
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
