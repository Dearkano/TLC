declare module '@tlc'{
    export interface IAddition{
        /**
         * 序号
         */
        id:number
        /**
         * 姓名
         */
        name:string
        /**
         * 体态评估
         */
        evaluation:string
        /**
         * 总能量
         */
        totalEnergy:number
        /**
         * 蛋白质
         */
        protein:number
        /**
         * 碳水化合物
         */
        carbohydrate:number
        /**
         * 脂肪
         */
        fat:number
        /**
         * 与疾病相关要点一
         */
        tip1:string
        /**
         * 要点二
         */
        tip2:string
        /**
         * 要点三
         */
        tip3:string
        /**
         * 饮食习惯四
         */
        habit4:string
        /**\
         * 饮食习惯五
         */
        habit5:string
        /**
         * 饮食习惯六
         */
        habit6:string
        /**
         * 谷薯
         */
        potato:number
        /**
         * 蔬菜
         */
        vegetable:number
        /**
         * 水果
         */
        fruit:number
        /**
         * 肉蛋
         */
        meat:number
        /**
         * 大豆
         */
        bean:number
        /**
         * 奶
         */
        milk:number
        /**
         * 坚果
         */
        nut:number
        /**
         * 油
         */
        oil:number
        /**
         * 总共
         */
        total:number
        /**
         * 正面照
         */
        frontPhoto:any
        /**
         * 侧面照
         */
        sidePhoto:any
    }
}