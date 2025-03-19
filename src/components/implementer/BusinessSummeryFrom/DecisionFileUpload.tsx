import NextButton from '@components/common/button/NextButton'
import PrevButton from '@components/common/button/PrevButton'
import FileUploadInputBox from '@components/common/form/FileUploadInputBox'
import InputBox from '@components/common/form/InputBox'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseBodyItem from '@components/common/layout/table/base/TableBaseBodyItem'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseHeadItem from '@components/common/layout/table/base/TableBaseHeadItem'
import { Box, TableRow } from '@mui/material'
import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useInsertDecisionFileUpload } from '@/api/implementer-application-api/implementer-application-api'
import type { InsertDecisionFileUploadParams } from '@/model'
import { useShowAlertMessage } from '@/store/message'

interface DecisionFileUploadProps {
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

const DecisionFileUpload: React.FC<DecisionFileUploadProps> = ({ handleNext, handleBack, isButtonShown }) => {
  const showAlertMessage = useShowAlertMessage()
  const { handleSubmit, control, register } = useForm<InsertDecisionFileUploadParams>({
    defaultValues: {
      implementerUploadFileRequestList: defaultAttachments.map(attachment => {
        return {
          file: undefined,
          description: '',
          type: Number(attachment.position),
          order: 1,
        }
      }),
    },
  })

  const { mutate } = useInsertDecisionFileUpload({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  const isTest = true
  const onSubmit: SubmitHandler<InsertDecisionFileUploadParams> = async data => {
    console.log('=======[data start]==========')
    console.log(data)
    console.log('=======[data end]==========')
    if (isTest) return

    // 저장
    mutate({
      judgSeq: 123,
      params: data,
    })
    // 다음 페이지 이동
    handleNext()
  }

  // const handleAppend = () => {
  //   append({
  //     agreementDate: '',
  //     agreementDetail: '',
  //   })
  // }
  //
  // const handleRemove = (index: number) => {
  //   remove(index)
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableBaseContainer title={'첨부 파일'}>
        <TableBaseHead>
          <TableRow>
            <TableBaseHeadItem width={200} label={'제목'} />
            <TableBaseHeadItem label={'첨부 파일 설명'} />
            <TableBaseHeadItem label={'첨부 파일'} />
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {defaultAttachments.map((item, index) => (
            <TableRow key={index}>
              <TableBaseBodyItem align={'left'}>
                {index + 1}. {item.name}
              </TableBaseBodyItem>
              <TableBaseBodyItem>
                <InputBox id={`implementerUploadFileRequestList.${index}.description`} register={register} type={'text'} />
              </TableBaseBodyItem>
              <TableBaseBodyItem>
                <FileUploadInputBox control={control} id={`implementerUploadFileRequestList.${index}.file`} />
              </TableBaseBodyItem>
            </TableRow>
          ))}
        </TableBaseBody>
      </TableBaseContainer>
      <Box sx={{ display: isButtonShown ? 'flex' : 'none', justifyContent: 'space-between', paddingTop: 1 }}>
        <PrevButton onClick={handleBack} />
        <NextButton type={'submit'} />
      </Box>
    </form>
  )
}

const defaultAttachments = [
  {
    name: '적정성 검토서',
    position: '3',
    mark: true,
    required: true,
    description: '적정성 검토서',
    isAddButton: false,
  },
  {
    name: '신청 문서(공문)',
    position: '4',
    mark: true,
    required: true,
    description: '신청 문서(공문)',
    isAddButton: false,
  },
  {
    name: '재결 신청서',
    position: '5',
    mark: true,
    required: true,
    description: '재결 신청서',
    isAddButton: false,
  },
  {
    name: '재결신청 청구서',
    position: '6',
    mark: false,
    required: false,
    description: '재결신청 청구서',
    isAddButton: false,
  },
  {
    name: '사업계획서',
    position: '7',
    mark: true,
    required: true,
    description: '사업계획서',
    isAddButton: false,
  },
  {
    name: '사업인정 관련 고시',
    position: '8',
    mark: true,
    description: '구역결정고시문 ',
    required: true,
    isAddButton: false,
    sub: [
      {
        message: '※ 변경고시(인가) 등 제출 서류가 있는 경우 추가 버튼 눌러 업로드 해주세요',
        description: '사업시행실시계획인가(시행인가)',
        position: '9',
        required: true,
        isAddButton: true,
      },
    ],
  },
  {
    name: '최초(도시계획결정 및 변경) 고시 사본 (구보등)',
    position: '10',
    mark: true,
    required: true,
    description: '최초(도시계획결정 및 변경) 고시 사본 (구보등)',
    isAddButton: false,
  },
  {
    name: '중토위 의견청취 관련 문서',
    description: '결과 회신 공문 사본',
    position: '11',
    mark: true,
    required: true,
    isAddButton: false,
    sub: [
      { description: '이행(보완)여부 자료', position: '12', required: false, isAddButton: false },
      { description: '이행(보완)여부 확인 증빙 서류', position: '13', required: false, isAddButton: false },
    ],
  },
  {
    name: '소유자별서류',
    description: '사업시행자 제시액 조서',
    position: '14',
    mark: true,
    required: true,
    isAddButton: false,
    sub: [
      { description: '토지조서(조서별 세목고시 첨부)', position: '15', required: false, isAddButton: false },
      { description: '물건조서', position: '16', required: false, isAddButton: false },
      { description: '협의 경위서', position: '17', required: true, isAddButton: false },
      { description: '토지 대장', position: '18', required: false, isAddButton: false },
      { description: '등기사항전부증명서', position: '19', required: false, isAddButton: false },
      { description: '토지이용계획확인서', position: '20', required: false, isAddButton: false },
      { description: '지적도', position: '21', required: false, isAddButton: false },
      { description: '측량도면', position: '22', required: false, isAddButton: false },
    ],
  },
  {
    name: '사업 예정지 및 사업계획 도면',
    position: '23',
    mark: false,
    required: false,
    description: '사업 예정지 및 사업계획 도면',
    isAddButton: false,
  },
  {
    name: '협의관계서류',
    description: '보상계획공고',
    position: '24',
    mark: true,
    required: true,
    isAddButton: false,
    sub: [
      { description: '손실보상 협의 요청문서', position: '25', required: true, isAddButton: false },
      { description: '공시 송달문서', position: '26', required: false, isAddButton: false },
    ],
  },
  {
    name: '감정평가서',
    description: '사업시행자 협의 감정평가서',
    position: '27',
    mark: true,
    required: true,
    isAddButton: false,
    sub: [
      { description: '시도지사 감정평가서', position: '28', required: false, isAddButton: false },
      { description: '토지 소유자 감정평가서', position: '29', required: false, isAddButton: false },
    ],
  },
  {
    name: '기본 조사서',
    description: '토지 기본 조사서',
    position: '30',
    mark: false,
    required: false,
    isAddButton: false,
    sub: [
      {
        description: '물건 기본 조사서',
        position: '31',
        required: false,
        isAddButton: false,
        message: '※ 2024.4.9 이후 보상계획 공고 또는 통지된 사업은 필수 업로드 해주세요',
      },
    ],
  },
  {
    name: '기타 증빙서류',
    message: '※ 기타 증빙서류가 있는 경우 추가 버튼 눌러 업로드 해주세요',
    position: '32',
    mark: false,
    required: false,
    description: '기타 증빙서류',
    isAddButton: true,
  },
]
export default DecisionFileUpload
