import { Box, FormHelperText } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import React from 'react'
import { type Control, Controller, type FieldError } from 'react-hook-form'

const formatPattern = 'yyyy-MM-dd'

interface DatePickerBoxProps {
  control: Control<any>
  id: string
  label?: string
  rules?: Record<string, any>
  error?: FieldError
}

const LocalDatePicker: React.FC<DatePickerBoxProps> = ({ control, id, label, rules, error }) => {
  const getDateChange = (newValue: Date | null) => {
    if (newValue) {
      // 날짜를 yyyy/MM/dd 형식으로 포맷
      return format(newValue, formatPattern)
    } else {
      return '' // 날짜가 없을 경우 빈 문자열로 처리
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <Controller
        name={id}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Box sx={{ p: '2px 4px', display: 'flex', flexDirection: 'column' }}>
            <DatePicker
              label={label}
              format={formatPattern}
              value={new Date(field.value)}
              onChange={newValue => {
                field.onChange(getDateChange(newValue))
              }}
            />
            <FormHelperText sx={{ color: 'red' }}>{error?.message}</FormHelperText>
          </Box>
        )}
      />
    </LocalizationProvider>
  )
}
export default LocalDatePicker
