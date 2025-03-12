export interface Menu {
  name: string
  sub: SubMenu[]
}

export interface SubMenu {
  name: string
  path: string
  roles?: string[]
}
