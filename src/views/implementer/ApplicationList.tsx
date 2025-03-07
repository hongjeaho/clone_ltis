import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'

import SearchBox from '@/components/base/searchBox/SearchBox'
import Title from '@/components/base/title/Title'
import { type FromProps } from '@/type/form/SearchForm'

const ApplicationList: React.FC = () => {
  const [searchResults, setSearchResults] = useState('')

  // SearchForm 제출 시 호출되는 함수
  const handleSearchSubmit: SubmitHandler<FromProps> = async data => {
    // input date 확인
    console.log(data)

    // API 호출 및 설정
    setSearchResults('')
  }

  useEffect(() => {
    console.log(searchResults)
  })

  return (
    <>
      <Title text="LTIS 입력 정보 확인" />
      <Container fixed>
        <SearchBox onSubmit={handleSearchSubmit} />
      </Container>
    </>
  )
}

export default ApplicationList
