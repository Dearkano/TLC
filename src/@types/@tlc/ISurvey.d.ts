declare module '@tlc' {
  export interface ISurvey {
    /**
     * 序号
     */
    id: number;
    /**
     * 编号
     */
    serial: string;
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
     * 身高
     */
    height: number;
    /**
     * 颈围
     */
    neckCircumference: number;
    /**
     * 上臂围
     */
    bicepsCircumference: number;
    /**
     * 腰围
     */
    waistline: number;
    /**
     * 小腿围
     */
    clafCircumference: number;
    /**
     * 体重
     */
    weight: number;
    /**
     * 28天目标
     */
    target28days: string;
    /**
     * bmi
     */
    BMI: number;
    /**
     * 肌肉
     */
    muscle: number;
    /**
     * 体脂率
     */
    fatRate: number;
    /**
     * 内脏脂肪
     */
    VAT: number;
    /**
     * 内脏脂肪等级
     */
    visceralFatRate: '低' | '偏低' | '正常' | '偏高' | '高';
    /**
     * 静息能量消耗
     */
    restingEnergyComsumption: number;
    /**
     * 正面照片
     */
    frontPhoto: string;
    /**
     * 正面露腰照
     */
    frontPhotoWithWaist: string;
    /**
     * 侧面照片
     */
    sidePhoto: string;
    /**
     * 侧面露腰照
     */
    sidePhotoWithWaist: string;
    /**
     * 评分
     */
    rate: number;
    /**
     * 俯卧撑
     */
    pushUp: number;
    /**
     * 卷腹
     */
    rollUp: number;
    /**
     * 靠墙静蹲
     */
    squatTime: number;
    /**
     * 开合跳
     */
    jumpingJacks: number;
    /**
     * 坐位体前屈
     */
    sitAndReach: number;
    /**
     * 自述
     */
    introduction: string;
    /**
     * 提交人
     */
    uploader: string;
    /**
     * 提交时间
     */
    uploadTime: string;
    /**
     * 修改时间
     */
    updateTime: string;
    /**
     * 填写设备
     */
    devicePlatform: string;
    /**
     * 操作系统
     */
    osPlatform: string;
    /**
     * 浏览器
     */
    browser: string;
    /**
     * ip
     */
    ip: string;
  }
}
