import InputBox from '@components/common/form/InputBox'
import TableLabelContainer from '@components/common/layout/table/label/TableLabelContainer'
import TableLabelItem from '@components/common/layout/table/label/TableLabelItem'
import TotalQuantityReport from '@components/implementer/BusinessSummeryFrom/TotalQuantityReport'
import { TableRow } from '@mui/material'
import React from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { type ImplementerApplicationRequest } from '@/model'

interface BusinessSummeryFromProps {
  onSubmit: SubmitHandler<ImplementerApplicationRequest>
}

const BusinessSummeryFrom: React.FC<BusinessSummeryFromProps> = ({ onSubmit }) => {
  const methods = useForm<ImplementerApplicationRequest>()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TableLabelContainer title={'사업개요'}>
          <TableRow>
            <TableLabelItem label={'규모(단위)'}>
              <InputBox id="decision.scale" placeholder="예) 1.234㎡" type="text" register={methods.register} />
            </TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'사업 기간'}>
              <InputBox id="decision.businessPeriod" placeholder="" type="text" register={methods.register} />
            </TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'총 물량조서'}>
              <TotalQuantityReport />
            </TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'사업시행 인가고시일'}></TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'협의 내역'}></TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'재결신청 사유'}></TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'시도지사 추쳔 여부'}></TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'대상 건축물'}></TableLabelItem>
          </TableRow>
          <TableRow>
            <TableLabelItem label={'재결신청 첨부파일'}></TableLabelItem>
          </TableRow>
        </TableLabelContainer>
      </form>
    </FormProvider>
  )
}

export default BusinessSummeryFrom
