import * as React from 'react';
import { ISurvey, IData } from '@tlc';
import data from '../../data/report/dietPlan';
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
          center: ['40%', '50%'],
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

    const chart1 = echarts.init(document.getElementById('chart1'), 'light', {
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

    return (
      <div className="basic-module">
        <div className="head2">(三) 饮食方案</div>

        <div className="head3">一、总能量</div>
        <div id="chart1" />

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
      </div>
    );
  }
}
