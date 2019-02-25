import * as React from 'react';
import { ISurvey, IData } from '@tlc';
import { Table } from 'antd';

interface P {
  item: IData;
}

const Basic: React.SFC<P> = ({ item }) => {
  const { init,base } = item;
  return (
    <div className="basic-module">
      <div className="head2">(一) 基本信息</div>
      <div className="head3 center">基础信息</div>
      <table className="e1-table">
        <tr>
          <td colSpan={5}>姓名</td>
          <td colSpan={5}>{init.name}</td>
          <td colSpan={5}>性别</td>
          <td colSpan={5}>{init.gender}</td>
          <td colSpan={5}>年龄</td>
          <td colSpan={5}>{init.age}</td>
        </tr>

        <tr>
          <td colSpan={6}>身高(cm)</td>
          <td colSpan={6}>体重(kg)</td>
          <td colSpan={6}>腰围(cm)</td>
          <td colSpan={6}>BMI(kg/m^2)</td>
          <td colSpan={6}>理想体重(kg)</td>
        </tr>

        <tr>
          <td colSpan={6}>{init.height}</td>
          <td colSpan={6}>{init.weight}</td>
          <td colSpan={6}>{init.waistline}</td>
          <td colSpan={6}>{init.BMI}</td>
          <td colSpan={6}>{init.target28days}</td>
        </tr>
      </table>

      <div className="head3 center">体格检查</div>
      <table className="e1-table">
        <tr>
          <td>基础代谢(kcal)</td>
          <td>体脂(%)</td>
          <td>骨骼肌含量(kg)</td>
          <td>内脏脂肪</td>
        </tr>

        <tr>
          <td>{init.restingEnergyComsumption}</td>
          <td>{init.fatRate}</td>
          <td>{init.muscle}</td>
          <td>{init.visceralFatRate}</td>
        </tr>
      </table>

      <div className="head3 center">肥胖相关疾病</div>
      <table className="e1-table">
      <tr>
        <td>血压</td>
        <td>糖尿病</td>
        <td>血脂异常</td>
        <td>脂肪肝</td>
        <td>高血尿酸或痛风</td>
      </tr>
      <tr>
        <td>{base.bloodPressure}</td>
        <td>{base.diabetes}</td>
        <td>{base.bloodFatProblem}</td>
        <td>{base.fattyLiver}</td>
        <td>{base.uricAcid}</td>
      </tr>
      </table>
    </div>
  );
};
export default Basic;
