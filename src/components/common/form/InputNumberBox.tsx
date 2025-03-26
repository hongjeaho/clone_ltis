import styled from '@emotion/styled/macro'
import TextField from '@mui/material/TextField'
import React from 'react'
import { type Control, Controller } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

interface InputNumberBoxProps {
  id: string
  control: Control<any>
  prefix?: string
  disabled?: boolean
  fixedDecimalScale?: boolean // 소수점 고정
  value?: string | number
}

const MAX_LIMIT = 99999999999

const Base = styled.div`
  input {
    text-align: right;
    margin-right: 5px;
  }
`

const InputNumberBox: React.FC<InputNumberBoxProps> = ({
  prefix = '',
  id,
  control,
  disabled = false,
  fixedDecimalScale = false,
  value,
}) => {
  return (
    <Base>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <NumericFormat
            id={id}
            customInput={TextField}
            prefix={prefix}
            value={value ?? field.value}
            variant="standard"
            disabled={disabled}
            decimalScale={fixedDecimalScale ? 2 : 0}
            thousandSeparator
            valueIsNumericString
            fixedDecimalScale
            getInputRef={field.ref}
            onValueChange={value => {
              field.onChange({
                target: {
                  name: id,
                  value: value.floatValue,
                },
              })
            }}
            isAllowed={values => {
              const { floatValue } = values
              return (floatValue ?? 0) < MAX_LIMIT
            }}
            sx={{ backgroundColor: disabled ? '#0000000f' : '#fff' }}
          />
        )}
      />
    </Base>
  )
}

export default InputNumberBox
