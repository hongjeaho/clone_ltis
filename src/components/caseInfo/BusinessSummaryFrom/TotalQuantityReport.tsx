import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseHeadItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { Box, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'

import { useInsertOrUpdateQuantityReport } from '@/api/case-application-api/case-application-api'
import InputNumberBox from '@/components/common/form/InputNumberBox'
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
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, register, setValue, control } = useForm<QuantityReportEntity>()

  const { mutate } = useInsertOrUpdateQuantityReport({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  const onSubmit: SubmitHandler<QuantityReportEntity> = async data => {
    console.log(data)

    mutate({
      judgSeq: 123,
      data,
    })
  }

  const landCnt = useWatch({
    control,
    name: 'landCnt',
  })

  const decisionLandCnt = useWatch({
    control,
    name: 'decisionLandCnt',
  })

  // // 필건
  // const [objCnt, decisionObjCnt, goodwillCnt, decisionGoodwillCnt] = watch([
  //   'objCnt',
  //   'decisionObjCnt',
  //   'goodwillCnt',
  //   'decisionGoodwillCnt',
  // ])

  // // 면적
  // const [landArea, decisionLandArea, etcArea, decisionEtcCnt] = watch([
  //   'landArea',
  //   'decisionLandArea',
  //   'etcArea',
  //   'decisionEtcCnt',
  // ])

  // // 금액
  // const [landPrice, decisionLandPrice, objPrice, decisionObjPrice, etcPrice, decisionEtcPrice] =
  //   watch([
  //     'landPrice',
  //     'decisionLandPrice',
  //     'objPrice',
  //     'decisionObjPrice',
  //     'etcPrice',
  //     'decisionEtcPrice',
  //   ])

  useEffect(() => {
    setValue('totalLandCnt', Number(landCnt ?? 0) + Number(decisionLandCnt ?? 0))
  }, [landCnt, decisionLandCnt])

  // useEffect(() => {
  //   // setValue('totalLandCnt', (landCnt ?? 0) + (decisionLandCnt ?? 0))
  // }, [objCnt, decisionObjCnt, goodwillCnt, decisionGoodwillCnt])

  // useEffect(() => {}, [landArea, decisionLandArea, etcArea, decisionEtcCnt])

  // useEffect(() => {}, [
  //   landPrice,
  //   decisionLandPrice,
  //   objPrice,
  //   decisionObjPrice,
  //   etcPrice,
  //   decisionEtcPrice,
  // ])

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
              ['필,건', '면적(m²)', '금액(천 원)'].map((text, subIndex) => (
                <TableBaseHeadItem key={`${index}-${subIndex}`} label={text} />
              )),
            )}
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {totalQuantityReportLabels.map((row, index) => (
            <TableRow key={index}>
              <TableBaseBodyItem key={index}>{row.label}</TableBaseBodyItem>
              {row.list.map((label, subIndex) => (
                <TableBaseBodyItem key={subIndex}>
                  {label.id !== '' ? (
                    <InputNumberBox
                      id={label.id}
                      disabled={label.disabled}
                      fixedDecimalScale={label.fixedDecimalScale}
                      register={register}
                    />
                  ) : (
                    '-'
                  )}
                </TableBaseBodyItem>
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
    list: [
      { id: 'totalLandCnt', disabled: true, fixedDecimalScale: false },
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
