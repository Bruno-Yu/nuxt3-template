// 使用範例
export const useSampleApi = async (payload: any) => {
  // method, url, payload, needToken, contentType: null | string = null
  const result = await useCustomFetch('POST', '/sample', payload, true, 'application/x-www-form-urlencoded')
  return result
}