import styled from '@emotion/styled/macro'

import titleImage from './images/b1.jpg'

interface TitleProps {
  text?: string
}

const Base = styled.div`
  padding: 2rem 0;
  background: #ddd no-repeat center / cover;
  background-image: url(${titleImage});
`

const H2 = styled.h2`
  width: 100%;
  font-weight: 700;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 100px #365978;
  font-size: 40px;
  line-height: 50px;
  word-wrap: break-word;
  word-break: keep-all;
`

const Title: React.FC<TitleProps> = ({ text }) => {
  if (text === undefined) return null
  return (
    <Base>
      <H2>{text}</H2>
    </Base>
  )
}

export default Title
