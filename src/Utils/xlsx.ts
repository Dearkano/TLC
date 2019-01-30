import xlsx from 'node-xlsx';
import { IXlsx, ISurvey } from '@tlc';
import { message } from 'antd';

export function readFile(filepath: string) {
    const workSheets: IXlsx[] = xlsx.parse(filepath);
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
    const data: ISurvey[] = [];
    for (const i in stringArray) {
      const obj = {};
      for (const j in stringArray[i]) {
        obj[properties[j]] = stringArray[i][j];
      }
      data.push(obj as ISurvey);
    }
    return data;
}
