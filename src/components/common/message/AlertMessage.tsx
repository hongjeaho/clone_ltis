import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CiWarning } from 'react-icons/ci'
import { useRecoilState } from 'recoil'

import { alertMessageState } from '@/store/message'

const AlertMessage: React.FC = () => {
  const [alertMessage, setAlertMessage] = useRecoilState(alertMessageState)
  const [isOpen, setOpen] = useState<boolean>(false)

  const onClose = () => {
    setOpen(false)
    if (typeof alertMessage.onCallBack === 'function') {
      alertMessage.onCallBack()
    }
    setTimeout(() => {
      setAlertMessage({ message: null })
    }, 150) // 150ms 후에 message를 null로 설정
  }

  useEffect(() => {
    if (alertMessage.message !== null) {
      setOpen(true)
    }
  }, [alertMessage])

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={onClose}
      maxWidth={'sm'}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <CiWarning />
      </DialogTitle>
      <DialogContent>{alertMessage.message}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertMessage
