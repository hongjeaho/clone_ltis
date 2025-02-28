import { atom, selector } from 'recoil'
import { localStorageEffect } from '../recoilEffect'
import { type AuthUser } from '@/model/authUser'
import { type BasicAuthority } from '@/model/basicAuthority'

export const userState = atom<AuthUser | null>({
  key: 'user',
  default: null,
  effects: [localStorageEffect('user')],
})

export const isLoginSelector = selector<boolean>({
  key: 'isLoginSelector',
  get: ({ get }) => get(userState) !== null,
})

export const userAuthoritySelector = selector<BasicAuthority[]>({
  key: 'userAuthoritySelector',
  get: ({ get }) => {
    const user = get(userState)
    return user?.roles ?? []
  },
})
