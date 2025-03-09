import { Box, Container, Tab, Tabs } from '@mui/material'
import { type SyntheticEvent, useState } from 'react'

import Title from '@/components/base/title/Title'
import CompensationPanel from '@/components/land/compensation/CompensationPanel'
import ExpropriationPanel from '@/components/land/compensation/ExpropriationPanel'

import styles from './Compensation.module.css'

const Compensation: React.FC = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Title text="토지수용제도 및 보상금 안내" />
      <Container fixed>
        <Box className={styles.tabBox}>
          <Tabs value={value} onChange={handleChange} aria-label="토지수용제도 및 보상금 안내">
            <Tab label="토지수용제도란?" className={styles.tabButton} />
            <Tab label="수용보상금액안내" className={styles.tabButton} />
          </Tabs>
        </Box>

        <ExpropriationPanel value={value} index={0} />
        <CompensationPanel value={value} index={1} />
      </Container>
    </>
  )
}

export default Compensation
