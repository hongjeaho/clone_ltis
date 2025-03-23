import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import InputTextBox from '@components/common/form/InputTextBox'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseHeadItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { Box, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useInsertDecisionTotalQuantityReport } from '@/api/implementer-application-api/implementer-application-api'
import { type DecisionTotalQuantityReportEntity } from '@/model'
import { useShowAlertMessage } from '@/store/message'

interface TotalQuantityReportProps {
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

const TotalQuantityReport: React.FC<TotalQuantityReportProps> = ({ handleNext, handleBack, isButtonShown }) => {
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, register } = useForm<DecisionTotalQuantityReportEntity>()

  const { mutate } = useInsertDecisionTotalQuantityReport({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })
  const onSubmit: SubmitHandler<DecisionTotalQuantityReportEntity> = async data => {
    console.log(data)

    mutate({
      judgSeq: 123,
      data,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableBaseContainer title={`총 물량조서`}>
        <TableBaseHead>
          <TableRow>
            <TableBaseHeadItem rowSpan={2} label={'구분'} />
            <TableBaseHeadItem colSpan={3} label={'총 보상대상'} />
            <TableBaseHeadItem colSpan={3} label={'협의취득 등'} />
            <TableBaseHeadItem colSpan={3} label={'재결신청'} />
          </TableRow>
          <TableRow>
            {[...Array(3)].map((_, index) =>
              ['필,건', '면적(m²)', '금액(천 원)'].map((text, subIndex) => <TableBaseHeadItem key={`${index}-${subIndex}`} label={text} />),
            )}
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {totalQuantityReportLabels.map((row, index) => (
            <TableRow key={index}>
              <TableBaseBodyItem key={index}>{row.label}</TableBaseBodyItem>
              {row.ids.map((id, subIndex) => (
                <TableBaseBodyItem key={subIndex}>{id !== '' ? <InputTextBox id={id} register={register} type={'text'} /> : ''}</TableBaseBodyItem>
              ))}
            </TableRow>
          ))}
        </TableBaseBody>
      </TableBaseContainer>

      <Box
        sx={{
          display: isButtonShown ? 'flex' : 'none',
          justifyContent: 'space-between',
          paddingTop: 1,
        }}
      >
        <PrevButton onClick={handleBack} />
        <NextButton onClick={handleNext} />
      </Box>
    </form>
  )
}

const totalQuantityReportLabels = [
  {
    label: '토 지',
    ids: [
      'decisionTotalQuantityReport.totalLandCnt',
      'decisionTotalQuantityReport.totalLandArea',
      'decisionTotalQuantityReport.totalLandPrice',
      'decisionTotalQuantityReport.landCnt',
      'decisionTotalQuantityReport.landArea',
      'decisionTotalQuantityReport.landPrice',
      'decisionTotalQuantityReport.decisionLandCnt',
      'decisionTotalQuantityReport.decisionLandArea',
      'decisionTotalQuantityReport.decisionLandPrice',
    ],
  },
  {
    label: '물건',
    ids: [
      'decisionTotalQuantityReport.totalObjCnt',
      '',
      'decisionTotalQuantityReport.totalObjPrice',
      'decisionTotalQuantityReport.objCnt',
      '',
      'decisionTotalQuantityReport.objPrice',
      'decisionTotalQuantityReport.decisionObjCnt',
      '',
      'decisionTotalQuantityReport.decisionObjPrice',
    ],
  },
  {
    label: '영업권',
    ids: [
      'decisionTotalQuantityReport.totalGoodwillCnt',
      '',
      'decisionTotalQuantityReport.totalGoodwillPrice',
      'decisionTotalQuantityReport.goodwillCnt',
      '',
      'decisionTotalQuantityReport.goodwillPrice',
      'decisionTotalQuantityReport.decisionGoodwillCnt',
      '',
      'decisionTotalQuantityReport.decisionGoodwillPrice',
    ],
  },
  {
    label: '기타',
    ids: [
      'decisionTotalQuantityReport.totalEtcCnt',
      'decisionTotalQuantityReport.totalEtcArea',
      'decisionTotalQuantityReport.totalEtcPrice',
      'decisionTotalQuantityReport.etcCnt',
      'decisionTotalQuantityReport.etcArea',
      'decisionTotalQuantityReport.etcPrice',
      'decisionTotalQuantityReport.decisionEtcCnt',
      'decisionTotalQuantityReport.decisionEtcArea',
      'decisionTotalQuantityReport.decisionEtcPrice',
    ],
  },
]

export default TotalQuantityReport
