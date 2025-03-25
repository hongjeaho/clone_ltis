import styled from '@emotion/styled/macro'
import { Button, InputBase, Paper } from '@mui/material'
import React from 'react'
import { type Control, Controller } from 'react-hook-form'
import { FaFileUpload } from 'react-icons/fa'

interface FileUploadInputBoxProps {
  control: Control<any>
  id: string
}

const FileUploadInputBox: React.FC<FileUploadInputBoxProps> = ({ id, control }) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div>
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={field?.value ? field.value.name : ''}
              placeholder="파일을 업로드 해주세요"
              inputProps={{ 'aria-label': '파일을 업로드 해주세요' }}
              disabled
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<FaFileUpload />}
            >
              업로드
              <VisuallyHiddenInput
                type="file"
                onChange={event => {
                  const file = event.target.files?.[0]
                  field.onChange(file)
                }}
              />
            </Button>
          </Paper>
        </div>
      )}
    />
  )
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
export default FileUploadInputBox
