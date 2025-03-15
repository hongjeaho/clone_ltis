import styled from '@emotion/styled/macro'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

const Message = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: #274ba9;
  text-align: center;
  font-weight: 600;
`

interface LoadingProps {
  isShow: boolean
  message?: string
}

const Loading: React.FC<LoadingProps> = ({ isShow = false, message }) => {
  if (!isShow) {
    return null
  }

  return (
    <Box
      position={'fixed'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
      zIndex={9999}
      bgcolor={'rgba(255, 255, 255, 0.8)'}
    >
      <div>
        <CircularProgress size={50} />
      </div>
      <Message>{message}</Message>
    </Box>
  )
}

export default Loading
