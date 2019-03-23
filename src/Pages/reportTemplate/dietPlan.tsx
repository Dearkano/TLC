import * as React from 'react';
import { ISurvey, IData } from '@tlc';
import data from '../../data/report/dietPlan';
const fs = require('fs');
const echarts = require('echarts');

interface P {
  item: IData;
}

export default class extends React.Component<P> {
  componentDidMount() {
    const { item } = this.props;
    const { addition } = item;
    const legendData = ['蛋白质', '碳水化合物', '脂肪'];
    const seriesData = [
      {
        name: '蛋白质',
        value: addition.protein
      },
      {
        name: '碳水化合物',
        value: addition.carbohydrate
      },
      {
        name: '脂肪',
        value: addition.fat
      }
    ];
    const option = {
      title: {
        text: `总能量: ${addition.totalEnergy}kcal`,
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        data: legendData,
        bottom: 10
      },
      series: [
        {
          name: '姓名',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    const chart1 = echarts.init(document.getElementById('chart1'), null, {
      width: 400,
      height: 400
    });
    chart1.setOption(option);
  }

  render() {
    const { item } = this.props;
    const { addition, base } = item;

    let foods = [
      '较低的碳水化合物',
      '优质高蛋白质',
      '低脂肪',
      '高膳食纤维饮食'
    ];
    if (base.bloodPressure === '偏高') {
      foods.push('低盐');
    }

    if (
      base.bloodFatProblem === '是' ||
      base.fattyLiver === '重度' ||
      base.fattyLiver === '中度'
    ) {
      foods.push('低胆固醇');
    }

    if (base.uricAcid === '是') {
      foods.push('控制嘌呤摄入量');
    }

    const content0 = ['饮食总原则', foods.join('、')];

    const { content1, content2, content3 } = data;

    const content4 = addition.tip1;
    const content5 = addition.tip2;
    const content6 = addition.tip3;

    const content7 = data.habit1;
    const content8 = data.habit2;
    const content9 = data.habit3;
    const content10 = addition.habit4;
    const content11 = addition.habit5;
    const content12 = addition.habit6;

    const hints = data.hint.map(i => <div className="paragraph">{i}</div>);
    const img1 = fs
      .readFileSync('./src/images/foodExchange.png')
      .toString('base64');

    return (
      <div className="basic-module">
        <div className="head2">(三) 饮食方案</div>

        <div className="head3">一、总能量</div>
        <div className="row center"><div id="chart1" /></div>

        <div className="head3">二、饮食原则</div>
        <div className="paragraph">{content0}</div>
        <div className="paragraph">{content1}</div>
        <div className="paragraph">{content2}</div>
        <div className="paragraph">{content3}</div>
        <div className="paragraph">{content4}</div>
        <div className="paragraph">{content5}</div>
        <div className="paragraph">{content6}</div>

        <div className="head3">三、饮食习惯</div>
        <div className="paragraph">{content7}</div>
        <div className="paragraph">{content8}</div>
        <div className="paragraph">{content9}</div>
        <div className="paragraph">{content10}</div>
        <div className="paragraph">{content11}</div>
        <div className="paragraph">{content12}</div>

        <div className="head3">四、食物交换份</div>
        <table className="e1-table">
          <tr>
            <td>总能量（kcal)</td>
            <td>谷薯（份）</td>
            <td>蔬菜（份）</td>
            <td>水果（份）</td>
            <td>肉蛋（份）</td>
            <td>大豆（份）</td>
            <td>奶（份）</td>
            <td>坚果（份）</td>
            <td>油（份）</td>
            <td>总共（份）</td>
          </tr>
          <tr>
            <td>{addition.totalEnergy}</td>
            <td>{addition.potato}</td>
            <td>{addition.vegetable}</td>
            <td>{addition.fruit}</td>
            <td>{addition.meat}</td>
            <td>{addition.bean}</td>
            <td>{addition.milk}</td>
            <td>{addition.nut}</td>
            <td>{addition.oil}</td>
            <td>{addition.total}</td>
          </tr>
        </table>

        {hints}

        <div className="row center">
          <img
            style={{ width: '200px' }}
            src={`data:image/png;base64,${img1}`}
          />
        </div>
        <div className="center paragraph">每份=90kcal能量</div>

        <div className="center head4">每一交换份食品的产能营养素含量表</div>

        <table className="e1-table">
          <tr>
            <td>组别</td>
            <td>食品类别</td>
            <td>每份质量(g)</td>
            <td>能量(kcal)</td>
            <td>蛋白质(g)</td>
            <td>脂肪(g)</td>
            <td>碳水化合物(g)</td>
          </tr>
          <tr>
            <td>谷薯组</td>
            <td>谷薯类</td>
            <td>25</td>
            <td>90</td>
            <td>2</td>
            <td>---</td>
            <td>90</td>
          </tr>
          <tr>
            <td rowSpan={2}>蔬菜组</td>
            <td>蔬菜类</td>
            <td>500</td>
            <td>90</td>
            <td>5</td>
            <td>---</td>
            <td>17</td>
          </tr>
          <tr>
            <td>水果类</td>
            <td>200</td>
            <td>90</td>
            <td>1</td>
            <td>---</td>
            <td>2</td>
          </tr>
          <tr>
            <td rowSpan={3}>肉蛋组</td>
            <td>大豆类</td>
            <td>25</td>
            <td>90</td>
            <td>9</td>
            <td>4</td>
            <td>6</td>
          </tr>
          <tr>
            <td>奶类</td>
            <td>160</td>
            <td>90</td>
            <td>5</td>
            <td>5</td>
            <td>---</td>
          </tr>
          <tr>
            <td>肉蛋类</td>
            <td>50</td>
            <td>90</td>
            <td>9</td>
            <td>6</td>
            <td>---</td>
          </tr>
          <tr>
            <td rowSpan={2}>油脂组</td>
            <td>坚果类</td>
            <td>15</td>
            <td>90</td>
            <td>4</td>
            <td>7</td>
            <td>2</td>
          </tr>
          <tr>
            <td>油脂类</td>
            <td>10</td>
            <td>90</td>
            <td>---</td>
            <td>10</td>
            <td>---</td>
          </tr>
        </table>

        <div className="center head4">各组等值食物交换表</div>
        <table className="e1-table">
          <tr>
            <td className="e1-table-c4">谷薯类 重量（g）</td>
            <td className="e1-table-3c4">食物举例</td>
          </tr>
          <tr>
            <td className="e1-table-c4">25</td>
            <td className="e1-table-3c4">
              大米、小米、干玉米、绿豆、红豆、芸豆、银耳、苏打饼干、面粉、通心粉、荞麦粉、干粉条、藕粉
            </td>
          </tr>
          <tr>
            <td className="e1-table-c4">30</td>
            <td className="e1-table-3c4">切面</td>
          </tr>
          <tr>
            <td className="e1-table-c4">35</td>
            <td className="e1-table-3c4">淡馒头</td>
          </tr>
          <tr>
            <td className="e1-table-c4">37.5</td>
            <td className="e1-table-3c4">咸面包</td>
          </tr>
          <tr>
            <td className="e1-table-c4">75</td>
            <td className="e1-table-3c4">茨菰</td>
          </tr>
          <tr>
            <td className="e1-table-c4">125</td>
            <td className="e1-table-3c4">山药、土豆、藕、芋艿</td>
          </tr>
          <tr>
            <td className="e1-table-c4">150</td>
            <td className="e1-table-3c4">荸荠</td>
          </tr>
          <tr>
            <td className="e1-table-c4">300</td>
            <td className="e1-table-3c4">凉粉</td>
          </tr>
        </table>
        <table className="e1-table">
          <tr>
            <td className="e1-table-c4">蔬菜类重量（g）</td>
            <td className="e1-table-3c4">食物举例</td>
          </tr>
          <tr>
            <td className="e1-table-c4">500</td>
            <td className="e1-table-3c4">
              白菜、芹菜、青菜、菠菜、韭菜、莴笋、西葫芦、冬瓜、黄瓜、苦瓜、茄子、番茄、绿豆芽、花菜、鲜蘑菇、笋、鲜海带
            </td>
          </tr>
          <tr>
            <td className="e1-table-c4">350</td>
            <td className="e1-table-3c4">马头兰、油菜、南瓜、甜椒、萝卜、茭白、豆苗、丝瓜</td>
          </tr>
          <tr>
            <td className="e1-table-c4">250</td>
            <td className="e1-table-3c4">荷兰豆、扁豆、豇豆、四季豆、西兰花</td>
          </tr>
          <tr>
            <td className="e1-table-c4">200</td>
            <td className="e1-table-3c4">蒜苗、胡萝卜、洋葱</td>
          </tr>
          <tr>
            <td className="e1-table-c4">100</td>
            <td className="e1-table-3c4">豌豆</td>
          </tr>
        </table>

        <table className="e1-table">
          <tr>
            <td className="e1-table-c4">水果类 重量（g）</td>
            <td className="e1-table-3c4">食物举例</td>
          </tr>
          <tr>
            <td className="e1-table-c4">750</td>
            <td className="e1-table-3c4">西瓜</td>
          </tr>
          <tr>
            <td className="e1-table-c4">300</td>
            <td className="e1-table-3c4">草莓、杨桃</td>
          </tr>
          <tr>
            <td className="e1-table-c4">250</td>
            <td className="e1-table-3c4">鸭梨、杏、柠檬</td>
          </tr>
          <tr>
            <td className="e1-table-c4">225</td>
            <td className="e1-table-3c4">柚子、枇杷</td>
          </tr>
          <tr>
            <td className="e1-table-c4">200</td>
            <td className="e1-table-3c4">橙子、橘子、苹果、猕猴桃、菠萝、梨子、香梨、桃子、樱桃</td>
          </tr>
          <tr>
            <td className="e1-table-c4">125</td>
            <td className="e1-table-3c4">柿子、鲜荔枝</td>
          </tr>
          <tr>
            <td className="e1-table-c4">100</td>
            <td className="e1-table-3c4">鲜枣</td>
          </tr>
        </table>

        <table className="e1-table">
          <tr>
            <td className="e1-table-c4">肉蛋类 重量（g）</td>
            <td className="e1-table-3c4">食物举例</td>
          </tr>
          <tr>
            <td className="e1-table-c4">15</td>
            <td className="e1-table-3c4">猪肋条肉</td>
          </tr>
          <tr>
            <td className="e1-table-c4">20</td>
            <td className="e1-table-3c4">太仓肉松、瘦香肠</td>
          </tr>
          <tr>
            <td className="e1-table-c4">25</td>
            <td className="e1-table-3c4">瘦猪肉、猪大排、猪肝、猪小排</td>
          </tr>
          <tr>
            <td className="e1-table-c4">50</td>
            <td className="e1-table-3c4">鸡肉、鸭肉、瘦牛肉、瘦羊肉、鸽子、鲳鱼、鲢鱼、豆腐干、香干</td>
          </tr>
          <tr>
            <td className="e1-table-c4">55</td>
            <td className="e1-table-3c4">鸡蛋、鸭蛋（中等大小）</td>
          </tr>
          <tr>
            <td className="e1-table-c4">70</td>
            <td className="e1-table-3c4">猪肚、猪心</td>
          </tr>
          <tr>
            <td className="e1-table-c4">75</td>
            <td className="e1-table-3c4">黄鱼、带鱼、鲫鱼、青鱼、青蟹</td>
          </tr>
          <tr>
            <td className="e1-table-c4">100</td>
            <td className="e1-table-3c4">河虾仁、牡蛎、蛤蜊肉、淡菜、目鱼、鱿鱼、老豆腐</td>
          </tr>
          <tr>
            <td className="e1-table-c4">200</td>
            <td className="e1-table-3c4">河蚌、蚬子、豆腐、豆腐脑</td>
          </tr>
        </table>

        <table className="e1-table">
          <tr>
            <td className="e1-table-c4">豆乳类 重量（g）</td>
            <td className="e1-table-3c4">食物举例</td>
          </tr>
          <tr>
            <td className="e1-table-c4">15</td>
            <td className="e1-table-3c4">全脂奶粉</td>
          </tr>
          <tr>
            <td className="e1-table-c4">20</td>
            <td className="e1-table-3c4">豆浆粉、干黄豆</td>
          </tr>
          <tr>
            <td className="e1-table-c4">25</td>
            <td className="e1-table-3c4">脱脂奶粉</td>
          </tr>
          <tr>
            <td className="e1-table-c4">100ml</td>
            <td className="e1-table-3c4">酸牛奶、淡全脂奶粉</td>
          </tr>
          <tr>
            <td className="e1-table-c4">200ml</td>
            <td className="e1-table-3c4">淡豆浆</td>
          </tr>
        </table>

        <table className="e1-table">
          <tr>
            <td className="e1-table-c4">油脂类 重量（g）</td>
            <td className="e1-table-3c4">食物举例</td>
          </tr>
          <tr>
            <td className="e1-table-c4">9</td>
            <td className="e1-table-3c4">豆油、菜油、麻油、花生油</td>
          </tr>
          <tr>
            <td className="e1-table-c4">12.5</td>
            <td className="e1-table-3c4">核桃仁</td>
          </tr>
          <tr>
            <td className="e1-table-c4">15</td>
            <td className="e1-table-3c4">花生米、杏仁、芝麻酱、松子</td>
          </tr>
          <tr>
            <td className="e1-table-c4">30</td>
            <td className="e1-table-3c4">葵花子、南瓜子</td>
          </tr>
        </table>
      </div>
    );
  }
}
