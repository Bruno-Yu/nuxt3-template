// 本地 assets icon 中照片顯示處理
import { filename } from 'pathe/utils'
import { CircleCloseFilled, SuccessFilled } from '@element-plus/icons-vue'

export function pngImages() {
  const pngGlob = import.meta.glob('~/assets/icon/*.{png,jpg,jpeg,gif,svg}', { eager: true })
  return Object.fromEntries(
    Object.entries(pngGlob).map(([key, value]) => [filename(key), value.default])
  )
}

// 轉換 strings to HTML
export function stringToHTML(str: string) {
  const dom = document.createElement('div')
  dom.innerHTML = str
  return dom
}

// 找出字串中的圖片網址 https 開頭 png 結尾
export function stringToPng(str: string) {
  const regex = /https:\/\/.*?\.(png|jpg|jpeg|gif|bmp|webp)/g
  const matches = str.match(regex) // 回傳的是陣列型式
  return matches?.length ? matches[0] : ''
}

// 複製進剪貼簿
export const copyToClipboard = async (text: string) => {
  const { $toast } = useNuxtApp()
  const type = 'text/plain'
  const blob = new Blob([text], { type })
  const data = [new ClipboardItem({ [type]: blob })]
  await navigator.clipboard.write(data)
  try {
    $toast({ message: 'copied into clipboard', duration: 2000, icon: SuccessFilled })
    console.log('success')
  }
  catch (e) {
    $toast({ message: 'copied failed', duration: 2000, icon: CircleCloseFilled })
  }
}
