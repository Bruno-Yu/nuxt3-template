// 定義支持的圖片類型
export const supportedImageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];

// 定義斷點 & 壓縮比率和對應的文件尾綴
export const compressRatesList = [
  {
    suffix: 'tablet',
    rate: 0.9,
    breakpoint: 768
  },
  {
    suffix: 'mobile',
    rate: 0.8,
    breakpoint: 375
  }
]

// 指定需要處理的目錄
export const targetDir = 'public/assets/img';

// 指定被壓縮的目錄
export const compressDir = 'public/assets/compressImg';

// 清除 Img 下的壓縮圖片
export const cleanImgDir = false;

// 清除 compressImg 下的壓縮圖片
export const cleanCompressDir = false;
