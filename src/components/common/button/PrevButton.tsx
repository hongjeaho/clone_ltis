import { Button } from '@mui/material'
import React from 'react'

interface PrevButtonProps {
  onClick?: () => void
}

const PrevButton: React.FC<PrevButtonProps> = ({ onClick }) => {
  return (
    <Button size={'large'} variant="contained" onClick={onClick} sx={{ backgroundColor: '#6c757d' }}>
      이전
    </Button>
  )
}
export default PrevButton
