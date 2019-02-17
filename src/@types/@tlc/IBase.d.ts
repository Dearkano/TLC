declare module '@tlc' {
  export interface IBase {
    /**
     * 序号
     */
    id: number;
    /**
     * 编号
     */
    serial: number;
    /**
     * 姓名
     */
    name: string;
    /**
     * 性别
     */
    gender: '男' | '女';
    /**
     * 年龄
     */
    age: number;
    /**
     * 平时的劳动强度
     */
    labourIntensity:
      | '轻度（以坐的工作为主）'
      | '中度 (以站或走的工作为主)'
      | '重度 (以竞技类和重体力活动为主)';
    /**
     * 最轻体重
     */
    minWeight: number;
    /**
     * 最重体重
     */
    maxWeight: number;
    /**
     * 最近3个月，您是否有以下症状(多选)
     */
    recentSymptoms: string;
    /**
     * 目前您是否患有下列疾病(多选)
     */
    illnesses: string;
    /**
     * 日常在服用的药物
     */
    usingMedicine: string;
    /**
     * 日常在服用的保健品
     */
    healthCareProducts: string;
    /**
     * 亲人肥胖
     */
    familyFat: boolean;
    /**
     * 亲人高血压
     */
    familyHighBloodPressure: boolean;
    /**
     * 亲人糖尿病
     */
    familyDiabetes: boolean;
    /**
     * 亲人血脂异常
     */
    familyBloodFatProblem: boolean;
    /**
     * 亲人冠心病
     */
    familyCoronaryHeartDisease: boolean;
    /**
     * 亲人脑卒中
     */
    familyStroke: boolean;
    /**
     * 亲人肿瘤
     */
    familyTumour: boolean;
    /**
     * 1、您每天吸烟的数量是
     */
    somkingNumber:
      | '0，不吸烟'
      | '5支左右'
      | '10支左右'
      | '20支左右'
      | '经常大于一包';
    /**
     * 2、过去3个月，您平均每周饮酒的次数
     */
    drinkingNumber: '0，不饮酒' | '1-2次' | '3-4次' | '5-7次';
    /**
     * 平均饮酒数量
     */
    averageDrinkNumber: string;
    /**
     * （1） 过去一年里，您一日三餐定时吃饭的情况是
     */
    dietCondition:
      | '从不按时吃'
      | '偶尔按时吃'
      | '有时按时吃'
      | '经常按时吃'
      | '几乎总是按时吃';
    /**
     * （2）过去一年里，您每天吃早餐的情况是
     */
    breakfastCondition:
      | '从不吃'
      | '偶尔吃'
      | '有时吃'
      | '经常吃'
      | '几乎总是吃';
    /**
     * （3）过去一周，您聚餐或在外改善伙食的次数是
     */
    outingCondition: '1-5次' | '6-10次' | '11-15次' | '16-20次';
    /**
     * （4）主要就餐方式（多选）
     */
    foodSource: string;
    /**
     * （5）平时的饮食偏好
     */
    dietPreference:
      | '偏咸'
      | '偏油腻'
      | '喜辣'
      | '重口味（多调料酱料）'
      | '清淡';
    /**
     * （6）较常吃的肉类(多选)
     */
    meatPreference: string;
    /**
     * （7） 每天摄入蔬菜≥3种，水果≥2种
     */
    vegetable3fruit2: boolean;
    /**
     * （8）奶类及奶制品（酸奶、奶粉、奶酪等）的摄入量情况是
     */
    dairyProductCondition:
      | '天天吃'
      | '每周3次及以上'
      | '每周2次及以下'
      | '基本不喝';
    /**
     * （9）主要的饮品选择(多选)
     */
    beverageCondition: string;
    /**
     * 饮品量:______毫升(CC)/天
     */
    drinkingAmount: number;
    /**
     * （10） 经常食用的零食是(多选)
     */
    snackPreference: string;
    /**
     * （11）食物过敏
     */
    foodAllergy: string;
    /**
     * （1）您平均每天静坐的累计时间（包括工作、看电视、乘车、使用电脑、吃饭、聊天等）
     */
    sittingTime:
      | '3小时以下'
      | '3-6小时'
      | '6-9小时'
      | '9-12小时'
      | '12小时以上';
    /**
     * （2）近3个月，您的每周运动次数
     */
    weeklyExerciseNumber:
      | '小于1次/周'
      | '1-2次/周  '
      | '3-4次/周  '
      | '5次及以上/周';
    /**
     * （3）您喜欢的有氧运动(多选）
     */
    aerobicPreference: string;
    /**
     * （4）您喜欢的其它复合类运动
     */
    compoundExercisePreference: string;
    /**
     * （5） 导致您不能经常锻炼的原因(多选)
     */
    noExerciseReasons: string;
    /**
     * （6）运动损伤及禁忌
     */
    sportsInjury: string;
    /**
     * （1）过去1年里，您上下班主要采取哪一种交通方式
     */
    commuterTransportation:
      | '步行'
      | '自行车'
      | '乘坐私车、公司班车，自己开车骑电动车'
      | '乘坐地铁或公交车';
    /**
     * （2）居住地附近是否有合适的锻炼场所(多选)
     */
    suitablePlaceForExercising: string;
    /**
     * （1）在过去3个月，您平均每天睡眠时间（包括午睡）为几小时？
     */
    averageSleepingTime: number;
    /**
     * （2）您的睡眠质量如何？
     */
    sleepingQuaility: '很好' | '好' | '一般' | '差' | '很差';
    /**
     * （3）如果您睡眠不好，造成睡眠质量不好的原因(多选)
     */
    sleepingProblemReasons: string;
    /**
     * （4）您是否有午睡的习惯
     */
    siesta: '是' | '否';
    /**
     * （5）您近三个月来是否有熬夜
     */
    stayUpCondition:
      | '完全没有'
      | '偶尔几次'
      | '平均每个月3-5次'
      | '平均每周2-3次'
      | '有一大半时间在熬夜';
    /**
     * 7、您是否每1-2年体检1次
     */
    physicalExamination: '是' | '否';
    /**
     * （1） 过去1年里，您平均每天的工作时间是:
     */
    averageWorkingTime: '小于8小时' | '8-10小时' | '10小时以上';
    /**
     * （2） 过去1年里，您经常感到工作压力大吗
     */
    pressureCondition:
      | '从来没有'
      | '偶尔感到'
      | '有时感到'
      | '经常感到'
      | '几乎总是如此';
    /**
     * （3）您在工作种能力的发挥程度如何？
     */
    abilityConidtion:
      | '完全能发挥'
      | '能发挥'
      | '基本能发挥'
      | '不太能发挥'
      | '不能发挥';
    /**
     * （1）过去1年里，您是否有更年期症状 ?
     */
    climacteric: '是' | '否';
    /**
     * （2） 过去1年里，您是否有痛经表现？
     */
    dysmenorrhea: '是' | '否';
    /**
     * （3）您在产后4周内，是否有过产后抑郁症状，如头疼、轻微抑郁、无法入睡、容易掉发或禁止不安等:
     */
    postpartumDepression: '是' | '否' | '不清楚' | '尚未生育';
    /**
     * 1、您的血压属于？
     */
    bloodPressure: '偏高' | '正常' | '偏低';
    /**
     * 2、您是否有糖尿病？
     */
    diabetes: '是' | '否';
    /**
     * 3、您的血脂是否异常？
     */
    bloodFatProblem: '是' | '否';
    /**
     * 4、您的脂肪肝程度为？
     */
    fattyLiver: '重度' | '中度' | '轻度' | '无';
    /**
     * 5、您的尿酸是否偏高？
     */
    uricAcid: '是' | '否';
    /**
     * 6、您的肾功能是否正常？
     */
    renalFunction: string;
    /**
     * 7、其他疾病
     */
    otherDisease: string;
    /**
     * 体检报告
     */
    medicalExaminationReport: any;
    /**
     * 1、你是否因为你的体重而感到非常困扰
     */
    doYouWorryAboutYourWeight: '是' | '否';
    /**
     * 2、你是否曾经严重地限制进食？
     */
    haveYouEverBeenOnExcessiveDiet: '是' | '否';
    /**
     * 3、你是否暴饮暴食同时吃泻药、通便剂、催吐等
     */
    haveYouEverZuoSi: '是' | '否';
    /**
     * 4、你是否做过量的运动来减轻你的体重？
     */
    haveYouEverOverexerciseToLoseWeight: '是' | '否';
  }
}
