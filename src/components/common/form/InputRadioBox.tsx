import { FormControl, FormHelperText, Radio, RadioGroup } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import React from 'react'
import type { FieldError, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputRadioBoxProps<T extends FieldValues> {
  id: string
  register: UseFormRegister<T>
  error?: FieldError
  rules?: Record<string, any>
  data: Array<{ value: boolean | string | number; label: string }>
  defaultValue?: boolean | string | number
  direction?: 'column' | 'row'
}

const InputRadioBox: React.FC<InputRadioBoxProps<any>> = ({ id, error, rules, data, register, defaultValue, direction = 'row' }) => {
  console.log(error)
  return (
    <FormControl sx={{ m: 0 }} error={error !== undefined} variant="standard">
      <RadioGroup name={id} defaultValue={defaultValue} sx={{ flexDirection: direction }}>
        {data?.map(({ value, label }, index) => (
          <FormControlLabel key={index} value={value} control={<Radio />} label={label} {...register(id, rules)} />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
}

export default InputRadioBox
