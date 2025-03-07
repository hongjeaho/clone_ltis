import { atom, useSetRecoilState } from 'recoil'

export const titleState = atom<string | undefined>({
  key: 'titleState',
  default: undefined,
})

export const useTitle = (title: string) => {
  const setTitleState = useSetRecoilState(titleState)
  setTitleState(title)
}
