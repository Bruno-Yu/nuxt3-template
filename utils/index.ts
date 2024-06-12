// 本地 assets icon 中照片顯示處理
import { filename } from 'pathe/utils'
import { CircleCloseFilled, SuccessFilled } from '@element-plus/icons-vue'
import { create, all } from 'mathjs'

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

// 遇到 iframe 時使用 innerHTML 會依照 iframe 所訂的大小，不會自適應，所以寬高需要轉換
export function changeIframeWidthHeight(content: string){
  if(!content.includes("iframe")) return 
  if(content.includes('iframe')){
    const iframeDomList =  document.querySelectorAll('iframe')
    iframeDomList.forEach(function (dom){
    const width = dom.getAttribute('width')
    const height = dom.getAttribute('height')
      if(width && height ){
        dom.removeAttribute('height')
        dom.removeAttribute('width')
        dom.style = `aspect-ratio: ${width/height}; width:100%;`
      } else {
        dom.style = "height: auto; width:100%;"
      }
    })
  }
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
  }
  catch (e) {
    $toast({ message: 'copied failed', duration: 2000, icon: CircleCloseFilled })
  }
}

// dayjs 轉字串到格式
export const convertToDate = (date: string) => {
  const dayjs = useDayjs()
  return date? dayjs(new Date(date)).format('YYYY-MM-DD HH:mm:ss') :  ''
}

type InputArray = 'required'| 'error'

// 共同 i18n error 變數替換訊息
export const i18nFormatError = (val: string, inputArray: InputArray[]) => {
  // 利用正則表達式找出'var_1'的字串
  const {t} = useNuxtApp().$i18n
  const regex = /var_1/g
  let text = ''
  if(inputArray.includes('required')){
    text = t('validate.required').toString().replace(regex, val)
  } else if(inputArray.includes('error')) {
    text = t('validate.error').toString().replace(regex, val)
  } else {
    text = val
  }
  return text
}

// 可以在 i18n 的字串中以替換變數的方式帶入對應的匯率名稱
export const i18nFormatCurrencySentence = (i18n_key: string, currencyId: number) => {
  // 利用正則表達式找出'var_1'的字串
  const currencyName = getCurrencyName(currencyId) ? getCurrencyName(currencyId): ''
  const {t} = useNuxtApp().$i18n
  const regex = /var_1/g // 目前 currency 所有的集合
  return t(`${i18n_key}`).toString().replace(regex, currencyName)
}


// 可以在 script 中使用 $t 語法轉換 i18n 字串 ex: $t('form.name')
export const $t = (msg: string) => {
  const {t} = useNuxtApp().$i18n
  return t(`${msg}`)
}


// 引入 mathjs 套件，並做 BigNumber 設定 ( 確保小數計算精確 )
export const mathConfig = () => {
  const config = {
    number: 'BigNumber',
    precision: 64
  }
  const mathjs = create(all, config)
  return mathjs

}

//  mathjs 計算
//  同等於 mathjs 官網中的 math.evaluate
//  equation 傳入的計算需是字串 ex: '1.02 - 1.003' 
//  回傳同樣也會是字串
//  ex: mathEvaluate('1.02 - 1.003')
export const mathEvaluate =(equation:  string):string => {
  const math = mathConfig()
  return math.evaluate(equation).toString()
}

// mathjs 的四捨五入計算
//  同等於 mathjs 官網中的 math.round()
//  inputNum 是被轉換的對象，可以是字串或是數值
//  decimalPoint 代表是需要四捨五入的位數，是數值
//  回傳同樣也會是字串
//  ex: mathRound(33.333333, 2)
export const mathRound = ( inputNum: string | number, decimalPoint: number ): string => {
  const math = mathConfig()
  let input = null
  if(typeof inputNum === 'number'){
    input = inputNum

  } else {
    input = Number(inputNum)
  }
  if(!isNaN(input)) {
    return math.format(math.round(input,decimalPoint), {notation: 'fixed', precision: decimalPoint}) 
  } else {
    return math.format(math.round(0, decimalPoint ),  {notation: 'fixed', precision: decimalPoint})
  }
}