import MuiDataGrid from '@components/common/form/MuiDataGrid/MuiDataGrid'
import { Box } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { FaRegFilePdf } from 'react-icons/fa6'

import Title from '@/components/base/title/Title'
import SearchBox from '@/components/implementer/SearchFilter'
import { type CaseInfoListParams } from '@/model/caseInfoListParams'

const ImplementerApplication: React.FC = () => {
  const [searchParam, setSearchParam] = useState<CaseInfoListParams>({})

  // SearchForm 제출 시 호출되는 함수
  const handleSearchSubmit: SubmitHandler<CaseInfoListParams> = async data => {
    setSearchParam(params => ({ ...params, ...data, pag: 0, pageSize: 10 }))
  }

  // 페이저 번호 설정
  const onChangePage = useCallback((page: number) => {
    setSearchParam(currentParam => ({ ...currentParam, page }))
  }, [])

  // 페이지 ROW 설정
  const onChangePageSize = useCallback((pageSize: number) => {
    setSearchParam(currentParam => ({ ...currentParam, pageSize, page: 0 }))
  }, [])

  const { data, isLoading } = useCaseInfo({ ...searchParam })

  return (
    <>
      <Title text="LTIS 입력 정보 확인" />
      <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>
        <SearchBox onSubmit={handleSearchSubmit} />
        <Box sx={{ paddingTop: '50px' }}>
          <MuiDataGrid
            data={data?.resultList ?? []}
            columns={[
              {
                field: 'recepDt',
                headerName: '접수일',
                width: 100,
              },
              {
                field: 'chargeNm',
                headerName: '담당자',
                width: 120,
              },
              {
                field: 'implementerNm',
                headerName: '사업시행자',
                width: 280,
              },
              {
                field: 'caseNo',
                headerName: '사건번호',
                width: 120,
              },
              {
                field: 'caseTitle',
                headerName: '사업명',
                width: 350,
              },
              {
                field: 'rejectionCnt',
                headerName: '반려횟수',
                type: 'number',
                width: 100,
              },
              {
                field: 'statNm',
                headerName: '심의 진행상황',
                type: 'string',
                width: 110,
              },
              {
                field: 'pdfView',
                headerName: 'PDF 미리보기',
                align: 'center',
                renderCell: () => (
                  <FaRegFilePdf
                    size={20}
                    style={{ cursor: 'pointer' }}
                    onClick={event => {
                      event.preventDefault()
                      alert('PDF Down')
                    }}
                  />
                ),
              },
            ]}
            totalPageSzie={data?.total ?? 0} // 전체 카운터
            pageSize={searchParam.pageSize ?? 10}
            onChangePage={onChangePage}
            onChangePageSize={onChangePageSize}
            rowId={'judgSeq'} // grid unique
            loading={isLoading}
            paginationColor="#de017e"
            paginationTextColor="#fff"
          />
        </Box>
      </Box>
    </>
  )
}

export default ImplementerApplication
function useCaseInfo(arg0: {
  keyword?: string
  startRecepDt?: string
  endRecepDt?: string
  address?: string
  implementerNm?: string
  decisionStep?: string[]
  page?: number
  pageSize?: number
}): { data: any; isLoading: any } {
  throw new Error('Function not implemented.')
}
