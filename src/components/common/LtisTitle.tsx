import styled from '@emotion/styled/macro'
import titleImage from './image/b1.jpg'

interface LtisTitleProps {
  title: string
}

const Base = styled.div`
  padding: 2rem 0;
  background: #ddd no-repeat center / cover;
  background-image: url(${titleImage});
`

const Title = styled.h2`
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

const LtisTitle: React.FC<LtisTitleProps> = ({ title }) => {
  return (
    <Base>
      <Title>{title}</Title>
    </Base>
  )
}

export default LtisTitle
