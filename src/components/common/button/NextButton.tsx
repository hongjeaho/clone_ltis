import { Button } from '@mui/material'
import React from 'react'

interface NextButtonProps {
  onClick?: () => void
  label?: string
}

const NextButton: React.FC<NextButtonProps> = ({ label = '다음', onClick }) => {
  return (
    <Button size={'large'} variant="contained" onClick={onClick} sx={{ backgroundColor: '#28a745' }}>
      {label}
    </Button>
  )
}
export default NextButton
