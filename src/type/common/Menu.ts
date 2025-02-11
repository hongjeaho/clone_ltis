export interface SubMenu {
  name: string
  path: string
}

export interface Menu {
  name: string
  path: string
  sub: SubMenu[]
}
