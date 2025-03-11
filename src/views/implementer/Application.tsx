import { Box } from '@mui/material'
import { useCallback, useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { FaRegFilePdf } from 'react-icons/fa6'

import { useGetImplementerApplication } from '@/api/implementer-application-api/implementer-application-api'
import MuiDataGrid from '@/commonComponents/form/MuiDataGrid'
import Title from '@/components/base/title/Title'
import SearchBox from '@/components/implementer/SearchFilter'
import { type GetImplementerApplicationParams } from '@/model/getImplementerApplicationParams'

const Application: React.FC = () => {
  const [searchParam, setSearchParam] = useState<GetImplementerApplicationParams>({})

  // SearchForm 제출 시 호출되는 함수
  const handleSearchSubmit: SubmitHandler<GetImplementerApplicationParams> = async data => {
    setSearchParam(data)
  }

  // 페이저 번호 설정
  const onChangePage = useCallback((page: number) => {
    setSearchParam(currentParam => ({ ...currentParam, page }))
  }, [])

  // 페이지 ROW 설정
  const onChangePageSize = useCallback((pageSize: number) => {
    setSearchParam(currentParam => ({ ...currentParam, pageSize, page: 0 }))
  }, [])

  const { data, isLoading } = useGetImplementerApplication({ ...searchParam })

  return (
    <>
      <Title text="LTIS 입력 정보 확인" />
      <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>
        <SearchBox onSubmit={handleSearchSubmit} />
        <Box sx={{ paddingTop: '50px' }}>
          <MuiDataGrid
            data={data?.resultList ?? []}
            columns={[
              { field: 'no', headerName: '순번', width: 90 },
              {
                field: 'recepDt',
                headerName: '접수일',
                width: 100,
              },
              {
                field: 'chargeNm',
                headerName: '담당자',
                width: 100,
              },
              {
                field: 'implementerNm',
                headerName: '사업시행자',
                width: 250,
              },
              {
                field: 'caseNo',
                headerName: '사건번호',
                width: 100,
              },
              {
                field: 'caseTitle',
                headerName: '사업명',
                width: 300,
              },
              {
                field: 'rejectionCnt',
                headerName: '반려횟수',
                type: 'number',
                width: 80,
              },
              {
                field: 'statNm',
                headerName: 'LTIS 진행상황',
                type: 'number',
                width: 110,
              },
              {
                field: 'pdfView',
                headerName: 'PDF 미리보기',
                align: 'center',
                renderCell: () => <FaRegFilePdf size={20} style={{ cursor: 'pointer' }} />,
              },
            ]}
            totalPageSzie={data?.total ?? 0} // 전체 카운터
            pageSize={searchParam.pageSize ?? 10}
            onChangePage={onChangePage}
            onChangePageSize={onChangePageSize}
            rowId={'judgSeq'} // grid unique
            loading={isLoading}
          />
        </Box>
      </Box>
    </>
  )
}

export default Application
