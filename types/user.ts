export type UserState = {
  userInfo: UserInfo
}

export type UserInfo = {
  avatar: string
  name: string 
  email: null
  phone: string
  token: string
  [prop: string]: any // 無用欄位
} | null


