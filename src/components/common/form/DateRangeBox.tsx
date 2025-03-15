import { Box } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { type Control, Controller } from 'react-hook-form'

interface DateRangeBoxProps {
  control: Control<any>
  startId: string
  endId: string
}

const formatPattern = 'yyyy/MM/dd'

const DateRangeBox: React.FC<DateRangeBoxProps> = ({ startId, endId, control }) => {
  const getDateChange = (newValue: Date | null) => {
    if (newValue) {
      // 날짜를 yyyy/MM/dd 형식으로 포맷
      return format(newValue, 'yyyy/MM/dd')
    } else {
      return '' // 날짜가 없을 경우 빈 문자열로 처리
    }
  }

  return (
    <Box component="section" display={'flex'} justifyContent={'flex-start'} gap={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
        {/* <DemoContainer components={['DatePicker', 'DatePicker']} > */}
        {/* Start Date Picker */}
        <Controller
          name={startId}
          control={control}
          render={({ field }) => (
            <DatePicker
              label="시작일"
              format={formatPattern}
              value={new Date(field.value)}
              onChange={newValue => {
                field.onChange(getDateChange(newValue))
              }}
            />
          )}
        />

        {/* End Date Picker */}
        <Controller
          name={endId}
          control={control}
          render={({ field }) => (
            <DatePicker
              label="종료일"
              format={formatPattern}
              value={new Date(field.value)}
              onChange={newValue => {
                field.onChange(getDateChange(newValue))
              }}
            />
          )}
        />
        {/* </DemoContainer> */}
      </LocalizationProvider>
    </Box>
  )
}

export default DateRangeBox
