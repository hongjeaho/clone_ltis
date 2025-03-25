import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import { Box, Step, StepLabel } from '@mui/material'
import Stepper from '@mui/material/Stepper/Stepper'
import React, { type ReactNode, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import BusinessRecognition from '@/components/caseInfo/BusinessSummaryFrom/BusinessRecognition'
import CaseFileUpload from '@/components/caseInfo/BusinessSummaryFrom/CaseFileUpload'
import CompensationAgreement from '@/components/caseInfo/BusinessSummaryFrom/CompensationAgreement'
import TotalQuantityReport from '@/components/caseInfo/BusinessSummaryFrom/TotalQuantityReport'

import BusinessInfo from './BusinessInfo'

interface Params {
  judgSeq: number
}

const BusinessSummeryFrom: React.FC = () => {
  const { judgSeq } = useParams() as unknown as Readonly<Params>

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const steps = useMemo(() => {
    return [
      {
        label: '사업 개요',
        component: (
          <BusinessInfo
            judgSeq={judgSeq}
            handleNext={handleNext}
            isButtonShown={activeStep === 0}
          />
        ),
      },
      {
        label: `총 물량조서`,
        component: (
          <TotalQuantityReport
            judgSeq={judgSeq}
            handleNext={handleNext}
            handleBack={handleBack}
            isButtonShown={activeStep === 1}
          />
        ),
      },
      {
        label: '사업인정관계',
        component: (
          <BusinessRecognition
            handleNext={handleNext}
            handleBack={handleBack}
            isButtonShown={activeStep === 2}
          />
        ),
      },
      {
        label: '협의 날짜',
        component: (
          <CompensationAgreement
            handleNext={handleNext}
            handleBack={handleBack}
            isButtonShown={activeStep === 3}
          />
        ),
      },
      {
        label: '첨부 파일',
        component: (
          <CaseFileUpload
            handleNext={handleNext}
            handleBack={handleBack}
            isButtonShown={activeStep === 4}
          />
        ),
      },
      { label: '내용 확인', component: <></> },
    ]
  }, [activeStep])

  return (
    <Box sx={{ width: '100%', paddingTop: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: ReactNode
          } = {}

          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {steps.map((step, index) => (
        <Box
          key={index}
          sx={{
            display: activeStep === index || activeStep === steps.length - 1 ? 'block' : 'none',
          }}
        >
          {step.component}
        </Box>
      ))}
      {activeStep === steps.length - 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
          <PrevButton onClick={handleBack} />
          <NextButton onClick={handleNext} label={'검토'} />
        </Box>
      )}
    </Box>
  )
}

export default BusinessSummeryFrom
