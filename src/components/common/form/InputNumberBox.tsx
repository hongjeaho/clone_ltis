import styled from '@emotion/styled/macro'
import TextField from '@mui/material/TextField'
import React from 'react'
import { type FieldValues } from 'react-hook-form/dist/types/fields'
import { type UseFormRegister } from 'react-hook-form/dist/types/form'
import { NumericFormat } from 'react-number-format'

interface InputNumberBoxProps<T extends FieldValues> {
  id: string
  register: UseFormRegister<T>
  rules?: Record<string, any>
  prefix?: string
  disabled?: boolean
  fixedDecimalScale?: boolean // 소수점 고정
}

const MAX_LIMIT = 99999999999

const Base = styled.div`
  input {
    text-align: right;
  }
`

const InputNumberBox: React.FC<InputNumberBoxProps<any>> = ({
  prefix = '',
  id,
  register,
  rules,
  disabled = false,
  fixedDecimalScale = false,
}) => {
  const { ref, ...rest } = register(id, rules)
  return (
    <Base>
      <NumericFormat
        customInput={TextField}
        prefix={prefix}
        variant="standard"
        {...rest}
        disabled={disabled}
        decimalScale={fixedDecimalScale ? 2 : 0}
        thousandSeparator
        valueIsNumericString
        fixedDecimalScale
        getInputRef={ref}
        isAllowed={values => {
          const { floatValue } = values
          return (floatValue ?? 0) < MAX_LIMIT
        }}
        sx={{ backgroundColor: disabled ? '#0000000f' : '#fff' }}
      />
    </Base>
  )
}

export default InputNumberBox
