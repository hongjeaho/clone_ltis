import { Box, Container } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'
import { FaRegFilePdf } from 'react-icons/fa6'

import { useGetImplementerApplication } from '@/api/implementer-application-api/implementer-application-api'
import Title from '@/components/base/title/Title'
import SearchBox from '@/components/implementer/SearchFilter'
import { type GetImplementerApplicationParams } from '@/model/getImplementerApplicationParams'

const Application: React.FC = () => {
  const [searchParam, setSearchParam] = useState<GetImplementerApplicationParams>({})

  // SearchForm 제출 시 호출되는 함수
  const handleSearchSubmit: SubmitHandler<GetImplementerApplicationParams> = async data => {
    // API 호출 및 설정
    setSearchParam(data)
  }

  const { data, isLoading } = useGetImplementerApplication({ ...searchParam })

  return (
    <>
      <Title text="LTIS 입력 정보 확인" />
      <Container id="tes" fixed>
        <SearchBox onSubmit={handleSearchSubmit} />

        <Box sx={{ height: 400, width: '100%', paddingTop: '50px' }}>
          <DataGrid
            rows={data?.resultList ?? []}
            columns={[
              { field: 'judgSeqNo', headerAlign: 'center', align: 'center', headerName: 'ID', width: 90 },
              {
                field: 'recepDt',
                headerAlign: 'center',
                headerName: '접수일',
                width: 100,
              },
              {
                field: 'charge',
                headerAlign: 'center',
                headerName: '담당자',
                width: 80,
              },
              {
                field: 'implements',
                headerAlign: 'center',
                headerName: '사업시행자',
                width: 110,
              },
              {
                field: 'caseNo',
                headerAlign: 'center',
                headerName: '사건번호',
                width: 100,
              },
              {
                field: 'caseTitle',
                headerAlign: 'center',
                headerName: '사업명',
                width: 110,
              },
              {
                field: 'address',
                headerAlign: 'center',
                headerName: '소재지',
                width: 150,
              },
              {
                field: 'rejectionCnt',
                headerAlign: 'center',
                headerName: '반려횟수',
                type: 'number',
                width: 80,
              },
              {
                field: 'decisionState',
                headerAlign: 'center',
                headerName: '심의진행현황',
                width: 110,
              },
              {
                field: 'statNm',
                headerAlign: 'center',
                headerName: 'LTIS 진행상황',
                type: 'number',
                width: 110,
              },
              {
                field: 'pdfView',
                headerAlign: 'center',
                headerName: 'PDF 미리보기',
                align: 'center',
                renderCell: () => <FaRegFilePdf size={20} style={{ cursor: 'pointer' }} />,
              },
            ]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pagination
            paginationMode="server"
            rowCount={data?.total} // 전체 카운터
            onPaginationModelChange={pageModel => {
              setSearchParam(param => ({ ...param, page: pageModel.page }))
            }}
            disableRowSelectionOnClick
            getRowId={row => row.judgSeq ?? 0} // grid unique
            loading={isLoading}
          />
        </Box>
      </Container>
    </>
  )
}

export default Application
