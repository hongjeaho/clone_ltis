import styled from '@emotion/styled/macro'
import { format } from 'date-fns'

const Footer = styled.footer`
  margin-top: 10px;
`

const Footter: React.FC = () => {
  return <Footer>&copy; {format(new Date(), 'yyyy.MM.dd')} XX  ㅗㅗㅗ</Footer>
}

export default Footter
