import xlsx from 'node-xlsx';
import { IXlsx, ISurvey } from '@tlc';

export function readFile() {
  const workSheets: IXlsx[] = xlsx.parse(`./input/data.xls`);
  const stringArray = workSheets[0].data;
  const properties = [
    'id',
    'serial',
    'name',
    'gender',
    'age',
    'height',
    'neckCircumference',
    'bicepsCircumference',
    'waistline',
    'clafCircumference',
    'weight',
    'target28days',
    'BMI',
    'muscle',
    'fatRate',
    'VAT',
    'visceralFatRate',
    'restingEneryguComsumption',
    'frontPhoto',
    'frontPhotoWithWaist',
    'sidePhoto',
    'sidePhotoWithWaist',
    'rate',
    'pushUp',
    'rollUp',
    'squatTime',
    'jumpingJacks',
    'sitAndReach',
    'introduction',
    'uploader',
    'uploadTime',
    'updateTime',
    'devicePlatform',
    'osPlatform',
    'browser',
    'ip'
  ];
  console.log(workSheets);
  console.log(stringArray);
  const data: ISurvey[] = [];
  for (const i in stringArray) {
    const obj = {};
    for (const j in stringArray[i]) {
      obj[properties[j]] = stringArray[i][j];
    }
    data.push(obj as ISurvey);
  }
  console.log(data);
  return data;
}
