import {supportedImageTypes,compressRatesList,targetDir,compressDir,  cleanImgDir,cleanCompressDir } from './compress-setting.js';
import sharp from 'sharp';
import path from 'path';
import {glob} from 'glob';
import fs from 'fs-extra';

const compressRates = (()=> {
  const obj = {}
  compressRatesList.forEach((rate)=> (obj[rate.suffix] = rate.rate))
  return obj;
})()

function isImage(file) {
  return supportedImageTypes.includes(path.extname(file).toLowerCase());
}

async function compressImage(file, rate, suffix) {
  const adjustedPath = path.dirname(file).replace(path.dirname(`${targetDir}/example.txt`).split('/').join(path.sep), '')
  const dir = path.join(compressDir,adjustedPath);
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const newFileName = `${baseName}_${suffix}${ext}`;
  const newFilePath = path.join(dir, newFileName);
  fs.ensureDir(dir);
  try {
    const metadata = await sharp(file).metadata();
    // console.log('metadata', metadata)
    if(metadata.format==="png") {
      await sharp(file)
      // .keepMetadata().
      .png({ 
        quality: 100*rate,
        compressionLevel: 9,
        palette: true,
      })
      .toFile(newFilePath);
    } else {
    await sharp(file)
      .resize({ width: Math.round(metadata.width * rate) })
      .toFile(newFilePath);
    }
    console.log(`新增圖片已壓縮成: ${newFilePath}`);
  } catch (err) {
    console.error(`Error compressing image ${file}:`, err);
  }
}

async function checkTabletAndMobile (imagesNameList, file) {
  const match = file.match(/([^\\]+)(\.\w+)$/);
  // 拿取目前要轉換的後墜名稱
  const ratioNameList = Object.keys(compressRates)
    // 處理字串，拿掉後墜
  let adjustedString =  match[1]
  // 確認是否有壓縮過
  let isHistoryExist = false
  ratioNameList.forEach(function(current){
    const pattern = new RegExp(`_${current}`, 'g');
    adjustedString = adjustedString.replace(pattern, '')
    imagesNameList.includes(`${adjustedString}_${current}`) && (isHistoryExist = true);
  })

  if(isHistoryExist){
    // console.log(`${match[1]}已壓縮過`)
    return; 
  } else {
    for (const [suffix, rate] of Object.entries(compressRates)) {
      await compressImage(file, rate, suffix); 
    }
  }
}

// 刪除指定資料夾下的特定後綴檔案
const deleteFilesWithSuffix = async(originPath, suffix) => {
  // 創建匹配模式
  // 使用 glob 查找匹配模式的文件
  const files = await glob(`${originPath}/**/*_${suffix}.*`);
      // 逐一刪除有後綴的文件
  files.forEach(file => {
    fs.remove(file)
      .then(() => {
        console.log(`Deleted file: ${file}`);
      })
      .catch(err => {
        console.error(`Error deleting file ${file}:`, err);
      });
  });
};

const checkDeleteItems = async() => {
  const ratioNameList = Object.keys(compressRates)
    ratioNameList.forEach(async function(suffix){
    cleanImgDir && await deleteFilesWithSuffix(targetDir, suffix)
    cleanCompressDir && await deleteFilesWithSuffix(compressDir, suffix)
  })
}


async function compressImagesInDir(dir) {
  try {
      // 拿取目前要轉換的後墜名稱
    await checkDeleteItems()
    const files = await glob(`${targetDir}/**/*.*`);
    const compressFiles = await glob(`${compressDir}/**/*.*`);
    const imageFiles = files.filter(isImage);
    const compressImageFiles = compressFiles.filter(isImage);
    if(!imageFiles.length) return;
    const imagesNameList =  compressImageFiles.map(file =>file.match(/([^\\]+)(\.\w+)$/)[1] )
    for (const file of imageFiles) {
    await checkTabletAndMobile(imagesNameList,file)
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// 確保目標目錄存在
if (fs.existsSync(targetDir)) {
  compressImagesInDir(targetDir);
} else {
  console.error(`The directory ${targetDir} does not exist.`);
}