import { css } from '@emotion/react'
import styled from '@emotion/styled/macro'

import { ImplementerStepList } from '@/store'

interface ImplementerStepProps {
  step: string
}

const StepBase = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  text-align: center;
`

const ImplementerStep: React.FC<ImplementerStepProps> = ({ step }) => {
  return (
    <StepBase>
      <ol>
        {ImplementerStepList.map(stepItem => (
          <ImplementerItem key={stepItem.value} stepItem={stepItem} activeStep={step} />
        ))}
      </ol>
    </StepBase>
  )
}

interface ImplementerItemProps {
  stepItem: {
    value: string
    label: string
  }
  activeStep: string
}

const StemItemWapper = styled.li`
  display: inline;
  float: left;
  position: relative;
  width: 16.666666%;

  :before {
    content: '';
    position: absolute;
    right: 50%;
    bottom: 50%;
    width: 100%;
    height: 2px;
    margin-bottom: -1px;
    background-color: #ddd;
  }

  &:first-child:before {
    display: none;
  }
`

const StepItem = styled.div<{ isActive: boolean }>`
  position: relative;
  z-index: 9;
  width: 106px;
  height: 106px;
  margin: 0 auto;
  border: #ddd solid 2px;
  border-radius: 100px;
  font-size: 14px;
  letter-spacing: 0px;
  line-height: 20px;
  text-align: center;

  ${({ isActive }) =>
    isActive
      ? css`
          border-color: #4261ac;
          background-color: #4261ac;
          color: #fff;
        `
      : css`
          background-color: #fff;
          color: #636363;
        `}
`

const StepItemTitle = styled.strong`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  margin-top: 25px;
  font-weight: 700;
  font-size: 13px;
  line-height: 25px;
  span {
    padding-left: 5px;
  }
`
const StepItemLabel = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
`

const ImplementerItem: React.FC<ImplementerItemProps> = ({ stepItem, activeStep }) => {
  return (
    <StemItemWapper>
      <StepItem isActive={stepItem.value === activeStep}>
        <StepItemTitle>
          STEP <span>0{stepItem.value}</span>
        </StepItemTitle>
        <StepItemLabel>{stepItem.label}</StepItemLabel>
      </StepItem>
    </StemItemWapper>
  )
}

export default ImplementerStep
