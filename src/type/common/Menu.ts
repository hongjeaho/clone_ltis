export interface Menu {
  name: string
  path: string
  sub: SubMenu[]
}

export interface SubMenu {
  name: string
  path: string
}
