import styled from '@emotion/styled/macro'
import Box from '@mui/material/Box/Box'
import { gridPageCountSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid'
import { GridPagination, GridToolbarContainer } from '@mui/x-data-grid/components'

const MuiDataGridToolBar: React.FC = () => {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  return (
    <GridToolbarContainer>
      <Box paddingLeft={2}>
        <h3> 조회 목록 ( total : {pageCount})</h3>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <MuiGridToolBarRowSize />
    </GridToolbarContainer>
  )
}

const MuiGridPaginationActionHidenBase = styled.div`
  .MuiTablePagination-actions {
    display: none;
  }
`

const MuiGridToolBarRowSize: React.FC = () => {
  return (
    <MuiGridPaginationActionHidenBase>
      <GridPagination labelRowsPerPage="페이지 행 수" labelDisplayedRows={() => ''} showLastButton={false} />
    </MuiGridPaginationActionHidenBase>
  )
}

export default MuiDataGridToolBar
