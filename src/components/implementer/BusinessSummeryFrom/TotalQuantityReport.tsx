import InputBox from '@components/common/form/InputBox'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseHeadItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { TableRow } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const TotalQuantityReport: React.FC = () => {
  const { register } = useFormContext()

  return (
    <TableBaseContainer paddingTop={0}>
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
        {[
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
        ].map((row, index) => (
          <TableRow key={index}>
            <TableBaseBodyItem key={index}>{row.label}</TableBaseBodyItem>
            {row.ids.map((id, subIndex) => (
              <TableBaseBodyItem key={subIndex}>{id !== '' ? <InputBox id={id} register={register} type={'text'} /> : ''}</TableBaseBodyItem>
            ))}
          </TableRow>
        ))}
      </TableBaseBody>
    </TableBaseContainer>
  )
}

export default TotalQuantityReport
