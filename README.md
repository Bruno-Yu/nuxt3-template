# Nuxt3 + TypeScript + Tailwind + Jest + Pinia + element-plus starter

> Nuxt3 開發模板 ( Nuxt3 + TypeScript + Tailwind + Pinia + i8n + element-plus + dayjs ) Node18

## 使用注意
此模板 dev 模式啟動時會同時啟動自動壓縮圖片的小工具 compress（使用套件 sharp, glob, fs-extra 製作），其可用 compress-setting 進行設定，其預設會將在 public/assets/img 內的圖片壓縮至 public/assets/compressImg 中，以確保在各解析度裝置下網頁能有更佳效能的呈現
## 使用技術

1. Nuxt3 (v3.11.2)
2. Node18
3. Typescript
4. Pinia / pinia-plugin-persistedstate
5. Tailwind
6. element-plus
7. i18n
8. dayjs
9. mathjs

## 使用 lint 風格
1. Prettier


## 安裝指令

```bash
yarn install
```

## 執行開發環境

```bash
yarn dev
```

## 建構

```bash
yarn build
```