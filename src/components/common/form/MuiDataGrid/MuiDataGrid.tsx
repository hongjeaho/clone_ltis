import styled from '@emotion/styled/macro'
import Box from '@mui/material/Box/Box'
import { gridClasses } from '@mui/x-data-grid'
import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { type GridCellParams, type GridColDef, type GridTreeNode } from '@mui/x-data-grid/models'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MuiDataGridPagination from './MuiDataGridPagination'
import MuiDataGridToolBar from './MuiDataGridToolBar'

interface MuiDataGridProps {
  columns: GridColDef[] // columns
  data: any[] // 노출 DATA
  totalPageSzie: number // total count
  pageSize: number // 한 페이지당 노출할 count
  loading: boolean // loading
  showCheckBox?: boolean // checkBox  노출 여부
  rowId: string // grid unique id
  onChangePage?: (page: number) => void // 페이지 번호 처리
  onChangePageSize?: (pageSize: number) => void // 페이지 ROW 처리
  paginationColor?: string // pagination Color
  paginationTextColor?: string
}

const StyleDataGrid = styled(DataGrid)`
  .MuiDataGrid-row:nth-of-type(odd) {
    background-color: #f0f0f0; /* 홀수 행의 배경색 */
  }

  .MuiDataGrid-row:nth-of-type(even) {
    background-color: #ffffff; /* 짝수 행의 배경색 */
  }

  .MuiDataGrid-row:hover {
    background-color: #b3e0ff !important; /* hover 시 하늘색 배경 */
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
  paginationColor,
  paginationTextColor,
  onChangePage,
  onChangePageSize,
}) => {
  const navigate = useNavigate()
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

  const onCellClick = (param: GridCellParams<any, unknown, unknown, GridTreeNode>) => {
    const judgSeq: string = param.row?.judgSeq ?? '0'
    if (param.field === 'caseTitle') {
      navigate(`/implementer/application/${judgSeq}`)
      return
    }

    console.log('cell click')
  }

  const onCellClassName = (params: GridCellParams<any, any>) => {
    if (params.field === 'caseTitle') {
      return 'pointer'
    }
    return ''
  }

  return (
    <Box
      sx={{
        height: 600,
        [`.${gridClasses.cell}.pointer`]: {
          cursor: 'pointer',
        },
      }}
    >
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
          if (pageModel.pageSize !== pageSize && onChangePageSize !== undefined) {
            onChangePageSize(pageModel.pageSize)
            return
          }

          if (onChangePage !== undefined) {
            onChangePage(pageModel.page)
          }
        }}
        onCellClick={onCellClick}
        getCellClassName={onCellClassName}
        disableRowSelectionOnClick={showCheckBox}
        getRowId={row => row[rowId] ?? 0} // grid unique
        loading={loading}
        pagination
        slots={{
          pagination: MuiDataGridPagination,
          toolbar: MuiDataGridToolBar,
        }}
        slotProps={{
          pagination: {
            sx: {
              backgroundColor: paginationColor,
              color: paginationTextColor,
            },
          },
        }}
      />
    </Box>
  )
}

export default MuiDataGrid
