import styled from '@emotion/styled/macro'
import { FormControl } from '@mui/material'
import TextField from '@mui/material/TextField'
import { type FieldError, type FieldValues, type UseFormRegister } from 'react-hook-form'

interface InputBoxProps<T extends FieldValues> {
  id: string
  label?: string
  type?: 'text' | 'password' | 'hidden'
  disabled?: boolean
  register: UseFormRegister<T>
  rules?: Record<string, any>
  error?: FieldError
  placeholder?: string
  fullWidth?: boolean
  value?: string | number
  hidden?: boolean
}

const Base = styled.div<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`

const InputTextBox: React.FC<InputBoxProps<any>> = ({
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
  hidden = false,
}) => {
  return (
    <Base hidden={hidden}>
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
    </Base>
  )
}

export default InputTextBox
