import { atom, selector } from 'recoil'
import { localStorageEffect } from '../recoilEffect'
import { type AuthUser } from '@/model/authUser'

export const customerState = atom<AuthUser | null>({
  key: 'customer',
  default: null,
  effects: [localStorageEffect('customer')],
})

export const isLoginSelector = selector<boolean>({
  key: 'isLoginSelector',
  get: ({ get }) => get(customerState) !== null,
})
