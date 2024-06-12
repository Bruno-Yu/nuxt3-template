export type UserState = {
  userInfo: UserInfo
}

export type UserInfo = {
  name: string // collection worker 的 name = phone
  email: null
  [prop: string]: any // 無用欄位
} | null



