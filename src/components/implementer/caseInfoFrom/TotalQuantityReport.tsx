import InputNumberBox from '@components/common/form/InputNumberBox'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseItem from '@components/common/layout/table/base/TableBaseItem'
import TableBaseLabelItem from '@components/common/layout/table/base/TableBaseLabelItem'
import SkeletonLoading from '@components/common/SkeletonLoading'
import NextButton from '@components/implementer/button/NextButton'
import PrevButton from '@components/implementer/button/PrevButton'
import useSumCalculator from '@components/implementer/caseInfoFrom/hook/useSumCalculator'
import { Box, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import {
  useGetQuantityReportByJudgSeq,
  useInsertOrUpdateQuantityReport,
} from '@/api/case-application-api/case-application-api'
import { type QuantityReportEntity } from '@/model/quantityReportEntity'
import { useShowAlertMessage } from '@/store/message'

interface TotalQuantityReportProps {
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
  judgSeq: number
}

const TotalQuantityReport: React.FC<TotalQuantityReportProps> = ({
  judgSeq,
  handleNext,
  handleBack,
  isButtonShown,
}) => {
  const { data, isSuccess } = useGetQuantityReportByJudgSeq(judgSeq)

  if (isSuccess) {
    return (
      <TotalQuantityReportForm
        judgSeq={judgSeq}
        handleNext={handleNext}
        handleBack={handleBack}
        defaultData={data}
        isButtonShown={isButtonShown}
      />
    )
  }

  return <SkeletonLoading />
}

interface TotalQuantityReportFromProps {
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
  judgSeq: number
  defaultData?: QuantityReportEntity
}

const TotalQuantityReportForm: React.FC<TotalQuantityReportFromProps> = ({
  defaultData,
  judgSeq,
  handleNext,
  handleBack,
  isButtonShown,
}) => {
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, control } = useForm<QuantityReportEntity>({
    defaultValues: defaultData,
  })

  const sumCalculate = useSumCalculator({ control })

  const { mutate } = useInsertOrUpdateQuantityReport({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  const onSubmit: SubmitHandler<QuantityReportEntity> = async data => {
    const inputData = Object.fromEntries(
      Object.entries(data)
        .map(([key, value]) => [key, value === undefined ? 0 : value])
        .map(([key, value]) => [key, value === '' ? 0 : value]),
    )

    mutate({
      judgSeq,
      data: {
        ...inputData,
        ...sumCalculate,
      },
    })

    handleNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableBaseContainer title={`총 물량조서`}>
        <TableBaseHead>
          <TableRow>
            <TableBaseLabelItem width={100} rowSpan={2} label={'구분'} />
            <TableBaseLabelItem colSpan={3} label={'총 보상대상'} />
            <TableBaseLabelItem colSpan={3} label={'협의취득 등'} />
            <TableBaseLabelItem colSpan={3} label={'재결신청'} />
          </TableRow>
          <TableRow>
            {[...Array(3)].map((_, index) =>
              ['필,건', '면적(m²)', '금액(천 원)'].map((text, subIndex) => (
                <TableBaseLabelItem key={`${index}-${subIndex}`} label={text} />
              )),
            )}
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {totalQuantityReportLabels.map((row, index) => (
            <TableRow key={index}>
              <TableBaseItem key={index}>{row.label}</TableBaseItem>
              {row.list.map((label, subIndex) => (
                <TableBaseItem key={subIndex}>
                  {label.id !== '' ? (
                    <InputNumberBox
                      id={label.id}
                      disabled={label.disabled}
                      fixedDecimalScale={label.fixedDecimalScale}
                      control={control}
                      value={sumCalculate[label.id]}
                    />
                  ) : (
                    '-'
                  )}
                </TableBaseItem>
              ))}
            </TableRow>
          ))}
          <TableRow>
            <TableBaseItem>합계</TableBaseItem>
            <TableBaseItem label="필건 총 합계">
              {sumCalculate.sumTotalCnt.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem label="면적 총 합계">
              {sumCalculate.sumTotalArea.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem label="금액 총 합계">
              {sumCalculate.sumTotalPrice.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem label="협의 취득 필건 합계">
              {sumCalculate.sumCnt.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem label="협의 취득 면적 합계">
              {sumCalculate.sumArea.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem label="협의 취득 금액 합계">
              {sumCalculate.sumPrice.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem label="재결 신청 필건 합계">
              {sumCalculate.sumDecisionCnt.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem label="재결 신청 면적 합계">
              {sumCalculate.sumDecisionArea.toLocaleString()}
            </TableBaseItem>
            <TableBaseItem>{sumCalculate.sumDecisionPrice.toLocaleString()}</TableBaseItem>
          </TableRow>
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
        <NextButton type="submit" />
      </Box>
    </form>
  )
}

const totalQuantityReportLabels = [
  {
    label: '토 지',
    list: [
      {
        id: 'totalLandCnt',
        disabled: true,
        fixedDecimalScale: false,
      },
      {
        id: 'totalLandArea',
        disabled: true,
        fixedDecimalScale: true,
      },
      {
        id: 'totalLandPrice',
        disabled: true,
        fixedDecimalScale: false,
      },
      { id: 'landCnt', disabled: false, fixedDecimalScale: false },
      { id: 'landArea', disabled: false, fixedDecimalScale: true },
      { id: 'landPrice', disabled: false, fixedDecimalScale: false },
      {
        id: 'decisionLandCnt',
        disabled: false,
        fixedDecimalScale: false,
      },
      {
        id: 'decisionLandArea',
        disabled: false,
        fixedDecimalScale: true,
      },
      {
        id: 'decisionLandPrice',
        disabled: false,
        fixedDecimalScale: false,
      },
    ],
  },
  {
    label: '물건',
    list: [
      { id: 'totalObjCnt', disabled: true, fixedDecimalScale: false },
      { id: '', disabled: true, fixedDecimalScale: false },
      {
        id: 'totalObjPrice',
        disabled: true,
        fixedDecimalScale: false,
      },
      { id: 'objCnt', disabled: false, fixedDecimalScale: false },
      { id: '', disabled: true, fixedDecimalScale: false },
      { id: 'objPrice', disabled: false, fixedDecimalScale: false },
      {
        id: 'decisionObjCnt',
        disabled: false,
        fixedDecimalScale: false,
      },
      { id: '', disabled: true, fixedDecimalScale: false },
      {
        id: 'decisionObjPrice',
        disabled: false,
        fixedDecimalScale: false,
      },
    ],
  },
  {
    label: '영업권',
    list: [
      {
        id: 'totalGoodwillCnt',
        disabled: true,
        fixedDecimalScale: false,
      },
      { id: '', disabled: true, fixedDecimalScale: false },
      {
        id: 'totalGoodwillPrice',
        disabled: true,
        fixedDecimalScale: false,
      },
      { id: 'goodwillCnt', disabled: false, fixedDecimalScale: false },
      { id: '', disabled: true, fixedDecimalScale: false },
      {
        id: 'goodwillPrice',
        disabled: false,
        fixedDecimalScale: false,
      },
      {
        id: 'decisionGoodwillCnt',
        disabled: false,
        fixedDecimalScale: false,
      },
      { id: '', disabled: true, fixedDecimalScale: false },
      {
        id: 'decisionGoodwillPrice',
        disabled: false,
        fixedDecimalScale: false,
      },
    ],
  },
  {
    label: '기타',
    list: [
      { id: 'totalEtcCnt', disabled: true, fixedDecimalScale: false },
      { id: 'totalEtcArea', disabled: true, fixedDecimalScale: true },
      {
        id: 'totalEtcPrice',
        disabled: true,
        fixedDecimalScale: false,
      },
      { id: 'etcCnt', disabled: false, fixedDecimalScale: false },
      { id: 'etcArea', disabled: false, fixedDecimalScale: true },
      { id: 'etcPrice', disabled: false, fixedDecimalScale: false },
      {
        id: 'decisionEtcCnt',
        disabled: false,
        fixedDecimalScale: false,
      },
      {
        id: 'decisionEtcArea',
        disabled: false,
        fixedDecimalScale: true,
      },
      {
        id: 'decisionEtcPrice',
        disabled: false,
        fixedDecimalScale: false,
      },
    ],
  },
]

export default TotalQuantityReport
