import * as React from 'react';
import data from '../../data/recipe';
import { IData } from '@tlc';

interface P {
  item: IData;
}
const Recipe: React.SFC<P> = ({ item }) => {
  const { init, base } = item;
  let pushUp = '';
  if (init.pushUp >= 0 && init.pushUp <= 5) {
    pushUp = '较差';
  } else if (init.pushUp >= 6 && init.pushUp <= 20) {
    pushUp = '一般';
  } else if (init.pushUp >= 21) {
    pushUp = '较好';
  } else {
    pushUp = '';
  }

  let rollUp = '';
  if (init.rollUp >= 0 && init.rollUp <= 10) {
    rollUp = '较差';
  } else if (init.rollUp >= 11 && init.rollUp <= 25) {
    rollUp = '一般';
  } else if (init.rollUp >= 26) {
    rollUp = '较好';
  } else {
    rollUp = '';
  }
  let st = '';
  if (init.squatTime >= 0 && init.squatTime <= 45) {
    st = '较差';
  } else if (init.squatTime >= 46 && init.squatTime <= 90) {
    st = '一般';
  } else if (init.squatTime >= 91) {
    st = '较好';
  } else {
    st = '';
  }

  let jj = '';
  if (init.jumpingJacks >= 0 && init.jumpingJacks <= 20) {
    jj = '较差';
  } else if (init.jumpingJacks >= 21 && init.jumpingJacks <= 50) {
    jj = '一般';
  } else if (init.jumpingJacks >= 51) {
    jj = '较好';
  } else {
    jj = '';
  }

  let sr = '';
  if (init.sitAndReach < -10) {
    sr = '较差';
  } else if (init.sitAndReach >= -10 && init.sitAndReach <= 0) {
    sr = '一般';
  } else if (init.sitAndReach >= 1) {
    sr = '较好';
  } else {
    sr = '';
  }
  return (
    <div className="basic-module">
      <div className="head3">您目前的运动情况为：</div>
      <table className="e-table">
        <tr>
          <td rowSpan={2}>测试成绩</td>
          <td>俯卧撑（个）</td>
          <td>卷腹（个）</td>
          <td>静蹲（秒）</td>
          <td>开合跳（个）</td>
          <td>坐位体前屈（厘米）</td>
        </tr>
        <tr>
          <td>{init.pushUp}</td>
          <td>{init.rollUp}</td>
          <td>{init.squatTime}</td>
          <td>{init.jumpingJacks}</td>
          <td>{init.sitAndReach}</td>
        </tr>
        <tr>
          <td rowSpan={2}>水平评估</td>
          <td>上肢</td>
          <td>核心</td>
          <td>下肢</td>
          <td>心肺功能</td>
          <td>柔韧性</td>
        </tr>
        <tr>
          <td>{pushUp}</td>
          <td>{rollUp}</td>
          <td>{st}</td>
          <td>{jj}</td>
          <td>{sr}</td>
        </tr>
      </table>
    </div>
  );
};

export default Recipe;
