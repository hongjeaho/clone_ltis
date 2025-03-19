import LocalDatePicker from '@components/common/form/LocalDatePicker'
import { Box } from '@mui/material'
import { type Control } from 'react-hook-form'

interface DateRangeBoxProps {
  control: Control<any>
  startId: string
  endId: string
}

const DatePickerRangeBox: React.FC<DateRangeBoxProps> = ({ startId, endId, control }) => {
  return (
    <Box component="section" display={'flex'} justifyContent={'flex-start'} gap={2}>
      <LocalDatePicker control={control} id={startId} />
      <LocalDatePicker control={control} id={endId} />
    </Box>
  )
}

export default DatePickerRangeBox
