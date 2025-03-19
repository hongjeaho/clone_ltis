import { FormControl } from '@mui/material'
import TextField from '@mui/material/TextField'
import { type FieldError, type FieldValues, type UseFormRegister } from 'react-hook-form'

interface InputBoxProps<T extends FieldValues> {
  id: string
  label?: string
  type?: string
  disabled?: boolean
  register: UseFormRegister<T>
  error?: FieldError
  placeholder?: string
  rules?: Record<string, any>
  fullWidth?: boolean
  value?: string
}

const InputBox: React.FC<InputBoxProps<any>> = ({
  id,
  label,
  type = 'text',
  placeholder,
  disabled = false,
  fullWidth = true,
  register,
  error,
  rules,
  value,
}) => {
  return (
    <>
      <FormControl fullWidth={fullWidth} variant="standard" sx={{ padding: 0 }}>
        <TextField
          id={id}
          label={label}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          fullWidth={fullWidth}
          value={value}
          margin="normal"
          variant="outlined"
          {...register(id, rules)}
          error={error !== undefined}
          helperText={error !== undefined ? error.message : ''}
          focused
          sx={{ padding: 0, margin: 0 }}
        />
      </FormControl>
    </>
  )
}

export default InputBox
