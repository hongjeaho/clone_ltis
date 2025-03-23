import { Skeleton, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { Fragment } from 'react'

const SkeletonLoading: React.FC = () => {
  return (
    <>
      <Grid container>
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Fragment key={i}>
              <Grid size={12}>
                <SkeletonTypography variant={'h1'} />
              </Grid>
              <Grid size={12}>
                <SkeletonTypography variant={'h3'} />
              </Grid>
              <Grid size={12}>
                <SkeletonTypography variant={'caption'} />
              </Grid>
              <Grid size={12}>
                <SkeletonTypography variant={'caption'} />
              </Grid>
            </Fragment>
          ))}
      </Grid>
    </>
  )
}

interface SkeletonTypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'caption'
}

const SkeletonTypography: React.FC<SkeletonTypographyProps> = ({ variant }) => {
  return (
    <Grid size={12}>
      <Typography component="div" variant={variant}>
        <Skeleton />
      </Typography>
    </Grid>
  )
}

export default SkeletonLoading
