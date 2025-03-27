import FileUploadInputBox from '@components/common/form/FileUploadInputBox'
import InputTextBox from '@components/common/form/InputTextBox'
import TableBaseBody from '@components/common/layout/table/base/TableBaseBody'
import TableBaseContainer from '@components/common/layout/table/base/TableBaseContainer'
import TableBaseHead from '@components/common/layout/table/base/TableBaseHead'
import TableBaseItem from '@components/common/layout/table/base/TableBaseItem'
import TableBaseLabelItem from '@components/common/layout/table/base/TableBaseLabelItem'
import NextButton from '@components/implementer/button/NextButton'
import PrevButton from '@components/implementer/button/PrevButton'
import { Box, Button, Divider, TableRow } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { IoAddCircle } from 'react-icons/io5'

import { useInsertCaseFileUpload } from '@/api/case-application-api/case-application-api'
import { type CaseInfoUploadFileRequest } from '@/model/caseInfoUploadFileRequest'
import { useShowAlertMessage } from '@/store/message'

interface CaseFileUploadProps {
  judgSeq: number
  handleNext: () => void
  handleBack: () => void
  isButtonShown: boolean
}

interface CaseFileUploadParam {
  implementerUploadFileRequestList: CaseInfoUploadFileRequest[]
}

const CaseFileUpload: React.FC<CaseFileUploadProps> = ({
  judgSeq,
  handleNext,
  handleBack,
  isButtonShown,
}) => {
  const [defaultAttachmentsState, setDefaultAttachments] = useState(defaultAttachments)
  const showAlertMessage = useShowAlertMessage()
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<CaseFileUploadParam>({
    defaultValues: {
      implementerUploadFileRequestList: defaultAttachments.map(attachment => {
        return {
          file: undefined,
          description: attachment.description,
          fileCode: attachment.type,
          order: 1,
        }
      }),
    },
  })

  const handlAddSubItem = (type: string) => {
    setDefaultAttachments(prevDocuments =>
      prevDocuments.map(doc => {
        if (doc.type === type) {
          doc?.sub?.push({
            description: '새로운 서류',
            type, // 새로운 항목의 type
          })
        }

        return doc
      }),
    )
  }

  const { mutate } = useInsertCaseFileUpload({
    mutation: {
      onSuccess: data => {},
      onError: error => {
        showAlertMessage(error.message)
      },
    },
  })

  const onSubmit: SubmitHandler<CaseFileUploadParam> = async data => {
    // 저장
    mutate({
      judgSeq,
      data: data.implementerUploadFileRequestList,
    })

    handleNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TableBaseContainer title={'첨부 파일'}>
        <TableBaseHead>
          <TableRow>
            <TableBaseLabelItem width={200} label={'제목'} />
            <TableBaseLabelItem label={'첨부 파일 설명'} />
            <TableBaseLabelItem label={'첨부 파일'} />
          </TableRow>
        </TableBaseHead>
        <TableBaseBody>
          {defaultAttachmentsState.map((item, index) => (
            <Fragment key={index}>
              <TableRow>
                <TableBaseItem align={'left'}>
                  {item.name !== undefined ? `${index + 1}. ${item.name}` : ''}
                </TableBaseItem>
                <TableBaseItem>
                  <InputTextBox
                    id={`implementerUploadFileRequestList.${index}.description`}
                    register={register}
                    type={'text'}
                  />
                </TableBaseItem>
                <TableBaseItem>
                  <Box display={'flex'}>
                    <FileUploadInputBox
                      control={control}
                      error={errors?.implementerUploadFileRequestList?.[index]?.file}
                      rules={{
                        required: item.required ? `${item.description} 필수 입니다.` : false,
                      }}
                      id={`implementerUploadFileRequestList.${index}.file`}
                    />
                    {item.isAddButton && ( // 추가 버튼
                      <>
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<IoAddCircle />}
                          onClick={() => {
                            handlAddSubItem(item.type)
                          }}
                        >
                          추가
                        </Button>
                      </>
                    )}
                  </Box>
                </TableBaseItem>
              </TableRow>
              {item?.sub?.map((subItem, subIndex) => (
                <TableRow key={subIndex}>
                  <TableBaseItem></TableBaseItem>
                  <TableBaseItem>
                    <InputTextBox
                      id={`implementerUploadFileRequestList.${index}.subImplementerUploadFile.${subIndex}.order`}
                      register={register}
                      value={subIndex + 1}
                      type={'hidden'}
                      hidden
                    />
                    <InputTextBox
                      id={`implementerUploadFileRequestList.${index}.subImplementerUploadFile.${subIndex}.description`}
                      placeholder={subItem?.description}
                      register={register}
                      type={'text'}
                    />
                  </TableBaseItem>
                  <TableBaseItem>
                    <Box display={'flex'}>
                      <FileUploadInputBox
                        control={control}
                        id={`implementerUploadFileRequestList.${index}.subImplementerUploadFile.${subIndex}.file`}
                      />
                    </Box>
                  </TableBaseItem>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBaseBody>
      </TableBaseContainer>
      <Box
        sx={{
          display: isButtonShown ? 'flex' : 'none',
          justifyContent: 'space-between',
          paddingTop: 1,
        }}
      >
        <PrevButton onClick={handleBack} />
        <NextButton type={'submit'} />
      </Box>
    </form>
  )
}

interface Attachment {
  name?: string
  type: string
  required: boolean
  description: string
  isAddButton: boolean
  message?: string
  sub?: SubAttachment[]
}

interface SubAttachment {
  type: string
  message?: string
  description: string
}

const defaultAttachments: Attachment[] = [
  {
    name: '적정성 검토서',
    type: 'CD002001',
    required: true,
    description: '적정성 검토서',
    isAddButton: false,
  },
  {
    name: '신청 문서(공문)',
    type: 'CD002002',
    required: true,
    description: '신청 문서(공문)',
    isAddButton: false,
  },
  {
    name: '재결 신청서',
    type: 'CD002003',
    required: true,
    description: '재결 신청서',
    isAddButton: false,
  },
  {
    name: '재결신청 청구서',
    type: 'CD002004',
    required: false,
    description: '재결신청 청구서',
    isAddButton: false,
  },
  {
    name: '사업계획서',
    type: 'CD002005',
    required: true,
    description: '사업계획서',
    isAddButton: false,
  },
  {
    name: '사업인정 관련 고시',
    type: 'CD002006',
    required: true,
    description: '구역결정고시문 ',
    isAddButton: false,
  },
  {
    type: 'CD002007',
    required: true,
    message: '※ 변경고시(인가) 등 제출 서류가 있는 경우 추가 버튼 눌러 업로드 해주세요',
    description: '사업시행실시계획인가(시행인가)',
    isAddButton: true,
    sub: [],
  },
  {
    name: '최초(도시계획결정 및 변경) 고시 사본 (구보등)',
    type: 'CD002008',
    required: true,
    description: '최초(도시계획결정 및 변경) 고시 사본 (구보등)',
    isAddButton: false,
  },
  {
    name: '중토위 의견청취 관련 문서',
    description: '결과 회신 공문 사본',
    type: 'CD002009',
    required: true,
    isAddButton: false,
  },
  { description: '이행(보완)여부 자료', type: 'CD002010', required: false, isAddButton: false },
  {
    description: '이행(보완)여부 확인 증빙 서류',
    type: 'CD002011',
    required: false,
    isAddButton: false,
  },
  {
    name: '소유자별서류',
    description: '사업시행자 제시액 조서',
    type: 'CD002012',
    required: true,
    isAddButton: false,
  },
  {
    description: '토지조서(조서별 세목고시 첨부)',
    type: 'CD002013',
    required: false,
    isAddButton: false,
  },
  { description: '물건조서', type: 'CD002014', required: false, isAddButton: false },
  { description: '협의 경위서', type: 'CD002015', required: true, isAddButton: false },
  { description: '토지 대장', type: 'CD002016', required: false, isAddButton: false },
  { description: '등기사항전부증명서', type: 'CD002017', required: false, isAddButton: false },
  { description: '토지이용계획확인서', type: 'CD002018', required: false, isAddButton: false },
  { description: '지적도', type: 'CD002019', required: false, isAddButton: false },
  { description: '측량도면', type: 'CD002020', required: false, isAddButton: false },
  {
    name: '사업 예정지 및 사업계획 도면',
    type: 'CD002021',
    required: false,
    description: '사업 예정지 및 사업계획 도면',
    isAddButton: false,
  },
  {
    name: '협의관계서류',
    description: '보상계획공고',
    type: 'CD002022',
    required: true,
    isAddButton: false,
  },
  { description: '손실보상 협의 요청문서', type: 'CD002023', required: true, isAddButton: false },
  { description: '공시 송달문서', type: 'CD002024', required: false, isAddButton: false },
  {
    name: '감정평가서',
    description: '사업시행자 협의 감정평가서',
    type: 'CD002025',
    required: true,
    isAddButton: false,
  },
  { description: '시도지사 감정평가서', type: 'CD002026', required: false, isAddButton: false },
  { description: '토지 소유자 감정평가서', type: 'CD002027', required: false, isAddButton: false },
  {
    name: '기본 조사서',
    description: '토지 기본 조사서',
    type: 'CD002028',
    required: false,
    isAddButton: false,
  },
  {
    description: '물건 기본 조사서',
    type: 'CD002029',
    required: false,
    isAddButton: false,
    message: '※ 2024.4.9 이후 보상계획 공고 또는 통지된 사업은 필수 업로드 해주세요',
  },
  {
    name: '기타 증빙서류',
    message: '※ 기타 증빙서류가 있는 경우 추가 버튼 눌러 업로드 해주세요',
    type: 'CD002030',
    required: false,
    description: '기타 증빙서류',
    isAddButton: true,
    sub: [],
  },
]
export default CaseFileUpload
