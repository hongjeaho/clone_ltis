import styled from '@emotion/styled/macro'
import Box from '@mui/material/Box/Box'
import Pagination from '@mui/material/Pagination'
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid'

// interface MuiDataGridPaginationProps {
//   sx: {
//     color?: string
//     textColor?: string
//   }
// }

const MuiDataGridPagination: React.FC = (props: any) => {
  const apiRef = useGridApiContext()
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)
  const page = useGridSelector(apiRef, gridPageSelector)
  const style = props.sx

  console.log(style.backgroundColor)
  const PaginationBox = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: center;

    button.Mui-selected {
      background-color: ${style.backgroundColor ?? 'lightblue'};
      color: ${style.color ?? 'black'};
    }
  `

  const onChange = (event: any, newPage: number) => {
    apiRef.current.setPage(newPage - 1)
  }

  return (
    <PaginationBox>
      <Pagination count={pageCount} page={page + 1} onChange={onChange} showFirstButton showLastButton />
    </PaginationBox>
  )
}

export default MuiDataGridPagination
