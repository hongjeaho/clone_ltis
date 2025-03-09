import styled from '@emotion/styled/macro'
import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import { type SubmitHandler, useForm } from 'react-hook-form'

import DateRangeBox from '@/commonComponents/form/DateRangeBox'
import { type GetImplementerApplicationParams } from '@/model'
import { DecisionStepList } from '@/store'

import InputBox from '../../commonComponents/form/InputBox'

interface SearchFilterProps {
  onSubmit: SubmitHandler<GetImplementerApplicationParams>
}

const Form = styled.form`
  width: 100%;
`

const SearchFilter: React.FC<SearchFilterProps> = ({ onSubmit }) => {
  const { handleSubmit, register, control } = useForm<GetImplementerApplicationParams>({
    defaultValues: {
      keyword: '',
      startRecepDt: '',
      endRecepDt: '',
      address: '',
      implementerNm: '',
      decisionStep: [],
    },
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} padding={2}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Grid container spacing={2} columns={2}>
            <Grid size={2}>
              <FormLabel component="legend">검색 키워드</FormLabel>
              <InputBox id="search" placeholder="사건번호 혹은 사업명" type="text" register={register} />
            </Grid>
            <Grid size={2}>
              <FormLabel component="legend">접수일</FormLabel>
              <DateRangeBox control={control} startId="recepStartDt" endId="recepEndDt" />
            </Grid>
            <Grid size={1}>
              <FormLabel component="legend">소재지</FormLabel>
              <InputBox id="address" type="text" register={register} />
            </Grid>
            <Grid size={1}>
              <FormLabel component="legend">시행자명</FormLabel>
              <InputBox id="implementer" type="text" register={register} />
            </Grid>
            <Grid size={2}>
              <FormLabel component="legend">심의 진행현황</FormLabel>
              {DecisionStepList.map((step, index) => (
                <FormControlLabel
                  key={`decisionStep${index}`}
                  control={<Checkbox value={step.value} {...register('decisionStep')} />}
                  label={step.label}
                />
              ))}
            </Grid>
            <Grid size={2} sx={{ paddingLeft: 40, paddingRight: 40 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                검색
              </Button>
            </Grid>
          </Grid>
        </div>
      </Form>
    </Box>
  )
}

export default SearchFilter
