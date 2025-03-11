import styled from '@emotion/styled/macro'
import Box from '@mui/material/Box/Box'
import Pagination from '@mui/material/Pagination'
import { gridPageCountSelector, gridPageSelector, GridPagination, GridToolbarContainer } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { useGridApiContext } from '@mui/x-data-grid/hooks/utils/useGridApiContext'
import { useGridSelector } from '@mui/x-data-grid/hooks/utils/useGridSelector'
import { type GridColDef } from '@mui/x-data-grid/models'
import { useEffect, useMemo, useState } from 'react'

interface MuiDataGridProps {
  columns: GridColDef[] // columns
  data: any[] // 노출 DATA
  totalPageSzie: number // total count
  pageSize: number // 한 페이지당 노출할 count
  onChangePage: (page: number) => void // 페이지 번호 처리
  onChangePageSize: (pageSize: number) => void // 페이지 ROW 처리
  loading: boolean // loading
  showCheckBox?: boolean // checkBox  노출 여부
  rowId: string // grid unique id
}

const StyleDataGrid = styled(DataGrid)`
  .MuiDataGrid-row:nth-child(odd) {
    background-color: #f0f0f0; /* 홀수 행의 배경색 */
  }

  .MuiDataGrid-row:nth-child(even) {
    background-color: #ffffff; /* 짝수 행의 배경색 */
  }

  .MuiDataGrid-row:hover {
    background-color: #b3e0ff !important; /* hover 시 하늘색 배경 */
    cursor: pointer;
  }

  .MuiDataGrid-row.Mui-selected {
    background-color: #b3e0ff !important; /* 선택된 행의 배경색 */
  }
`

const MuiDataGrid: React.FC<MuiDataGridProps> = ({
  columns,
  data,
  loading,
  totalPageSzie,
  pageSize,
  showCheckBox = false,
  rowId,
  onChangePage,
  onChangePageSize,
}) => {
  const sortColumns = useMemo<GridColDef[]>(() => {
    return columns.map(column => ({ headerAlign: 'center', align: 'center', ...column }))
  }, [columns])

  // 전체 RowCount 초기화 설정값
  const [rowCount, setRowCount] = useState(totalPageSzie)
  // 전체 RowCount 초기화 설정
  useEffect(() => {
    if (totalPageSzie > 0 && rowCount !== totalPageSzie) {
      setRowCount(totalPageSzie)
    }
  }, [totalPageSzie, rowCount])

  console.log(MuiGridPagination)

  return (
    <Box sx={{ height: 600 }}>
      <StyleDataGrid
        rows={data ?? []}
        columns={sortColumns}
        rowHeight={38}
        paginationMode="server"
        rowCount={rowCount}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={pageModel => {
          if (pageModel.pageSize !== pageSize) {
            onChangePageSize(pageModel.pageSize)
            return
          }
          onChangePage(pageModel.page)
        }}
        disableRowSelectionOnClick={showCheckBox}
        getRowId={row => row[rowId] ?? 0} // grid unique
        loading={loading}
        pagination
        slots={{
          pagination: MuiDataGridPagination,
          toolbar: MuiDataGridToolBar,
        }}
      />
    </Box>
  )
}

const MuiDataGridToolBar: React.FC = () => {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <GridToolbarContainer>
      <h3> 조회 목록 ( total : {pageCount})</h3>
      <Box sx={{ flexGrow: 1 }} />
      <MuiGridPagination />
    </GridToolbarContainer>
  )
}

const MuiGridPaginationActionHidenBase = styled.div`
  .MuiTablePagination-actions {
    display: none;
  }
`

const MuiGridPagination: React.FC = () => {
  return (
    <MuiGridPaginationActionHidenBase>
      <GridPagination labelRowsPerPage="페이지 행 수" labelDisplayedRows={() => ''} showLastButton={false} />
    </MuiGridPaginationActionHidenBase>
  )
}

const MuiDataGridPagination: React.FC = () => {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)
  const page = useGridSelector(apiRef, gridPageSelector)

  const onChange = (event: any, newPage: number) => {
    apiRef.current.setPage(newPage - 1)
  }

  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'}>
      <Pagination count={pageCount} page={page + 1} onChange={onChange} showFirstButton showLastButton />
    </Box>
  )
}

export default MuiDataGrid
