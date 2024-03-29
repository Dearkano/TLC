import xlsx from 'node-xlsx';
import { IXlsx, ISurvey, IBase, IAddition } from '@tlc';
import { message } from 'antd';

export function readInitData(filepath: string) {
  const workSheets: IXlsx[] = xlsx.parse(filepath);
  let stringArray = workSheets[0].data;
  stringArray.splice(0, 1);
  console.log(stringArray);
  const properties = [
    'id',
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
    'visceralFatRate',
    'restingEnergyComsumption',
    'frontPhoto',
    'frontPhotoWithWaist',
    'sidePhoto',
    'sidePhotoWithWaist',
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

export function readBase(filepath: string) {
  const workSheets: IXlsx[] = xlsx.parse(filepath);
  let stringArray = workSheets[0].data;
  stringArray.splice(0, 2);
  const data: IBase[] = [];
  const properties = [
    'id',
    'name',
    'gender',
    'age',
    'labourIntensity:',
    'minWeight',
    'maxWeight',
    'recentSymptoms',
    'illnesses',
    'usingMedicine',
    'healthCareProducts',
    'familyFat',
    'familyHighBloodPressure',
    'familyDiabetes',
    'familyBloodFatProblem',
    'familyCoronaryHeartDisease',
    'familyStroke',
    'familyTumour',
    'somkingNumber',
    'drinkingNumber',
    'averageDrinkNumber',
    'dietCondition',
    'breakfastCondition',
    'outingCondition',
    'foodSource',
    'dietPreference',
    'meatPreference',
    'vegetable3fruit2',
    'dairyProductCondition',
    'beverageCondition',
    'drinkingAmount',
    'snackPreference',
    'foodAllergy',
    'sittingTime',
    'weeklyExerciseNumber',
    'aerobicPreference',
    'compoundExercisePreference',
    'noExerciseReasons',
    'sportsInjury',
    'commuterTransportation',
    'suitablePlaceForExercising',
    'averageSleepingTime',
    'sleepingQuaility',
    'sleepingProblemReasons',
    'siesta',
    'stayUpCondition',
    'physicalExamination',
    'averageWorkingTime',
    'pressureCondition',
    'abilityConidtion',
    'climacteric',
    'dysmenorrhea',
    'postpartumDepression',
    'bloodPressure',
    'diabetes',
    'bloodFatProblem',
    'fattyLiver',
    'uricAcid',
    'renalFunction',
    'otherDisease',
    'medicalExaminatioReport',
    'doYouWorryAboutYourWeight',
    'haveYouEverBeenOnExcessiveDiet',
    'haveYouEverZuoSi',
    'haveYouEverOverexerciseToLoseWeight'
  ];
  for (const i in stringArray) {
    const obj = {};
    for (const j in stringArray[i]) {
      obj[properties[j]] = stringArray[i][j];
    }
    data.push(obj as IBase);
  }
  return data;
}

export function readAddition(filepath: string) {
  const workSheets: IXlsx[] = xlsx.parse(filepath);
  let stringArray = workSheets[0].data;
  console.log(stringArray)
  stringArray.splice(0, 1);
  const data: IAddition[] = [];
  const properties = [
    'id',
    'name',
    'evaluation',
    'totalEnergy',
    'protein',
    'carbohydrate',
    'fat',
    'tip1',
    'tip2',
    'tip3',
    'habit4',
    'habit5',
    'habit6',
    'potato',
    'vegetable',
    'fruit',
    'meat',
    'bean',
    'milk',
    'nut',
    'oil',
    'total',
    'frontPhoto',
    'sidePhoto'
  ];
  for (const i in stringArray) {
    const obj = {};
    for (const j in stringArray[i]) {
      obj[properties[j]] = stringArray[i][j];
    }
    data.push(obj as IAddition);
  }
  return data;
}
