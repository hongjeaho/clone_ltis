import { type Menu } from '@/type/common/Menu'

export const menuState: Menu[] = [
  {
    name: '토지수용제도안내',
    sub: [
      { name: '토지수용제도 및 보상금안내', path: '/land/compensation' },
      { name: '수용재결 안내', path: '/land/acceptanceDecision' },
      { name: '수용재결 절차안내', path: '/land/procedure' },
      { name: '서울지방토지 수용위원회', path: '/land/committee' },
      { name: '구별 담당현황', path: '/land/charge' },
      { name: '구별 재결정보시스템(LTIS)바로가기', path: '' },
    ],
  },
  {
    name: '사업시행자',
    sub: [
      { name: 'LTIS입력정보확인', path: '/implementer/application' },
      { name: '재결신청 의견제출', path: '' },
    ],
  },
  {
    name: '열람공고',
    sub: [{ name: '열람공고 결과등록', path: '' }],
  },
  {
    name: '감정평가사',
    sub: [{ name: '재결감정평가 의견등록', path: '' }],
  },
  {
    name: '재결관',
    sub: [
      { name: '열람공고 의뢰', path: '' },
      { name: '심의 안건 검토', path: '' },
      { name: '심의서 작성', path: '' },
      { name: '심의 기록', path: '' },
      { name: '통계', path: '' },
    ],
  },
  {
    name: '심의 위원',
    sub: [{ name: '심의안건', path: '' }],
  },
]
