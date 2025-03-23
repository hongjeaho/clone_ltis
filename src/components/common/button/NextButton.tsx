import { Button } from '@mui/material'
import React from 'react'

interface NextButtonProps {
  onClick?: () => void
  label?: string
  type?: 'button' | 'submit'
}

const NextButton: React.FC<NextButtonProps> = ({ type = 'button', label = '다음', onClick }) => {
  return (
    <Button type={type} size={'large'} variant="contained" sx={{ backgroundColor: '#28a745' }}>
      {label}
    </Button>
  )
}

export default NextButton
