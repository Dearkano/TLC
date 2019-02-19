import * as React from 'react';
import data from '../../data/recipe/recipe';
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

  let aerobicExerciseTimeTip = '';
  let anAerobicExerciseTimeTip = '';
  if (
    base.weeklyExerciseNumber === '小于1次/周' ||
    base.weeklyExerciseNumber === '1-2次/周  '
  ) {
    aerobicExerciseTimeTip = data.exerciseTimesTip1;
    anAerobicExerciseTimeTip = data.exerciseTimesTip3;
  } else if (
    base.weeklyExerciseNumber === '5次及以上/周' ||
    base.weeklyExerciseNumber === '3-4次/周  '
  ) {
    aerobicExerciseTimeTip = data.exerciseTimesTip2;
    anAerobicExerciseTimeTip = data.exerciseTimesTip4;
  } else {
    aerobicExerciseTimeTip = '';
    anAerobicExerciseTimeTip = '';
  }

  let preferenceExercises = base.aerobicPreference.split('，');
  const exercises = preferenceExercises.map((item, index) => (
    <>
      <div className="paragraph">
        {item === '快走' && (
          <>
            <div className="head4">快走</div>
            {data.eTip1.map(t => (
              <div className="paragraph">{t}</div>
            ))}
          </>
        )}
      </div>
      <div className="paragraph">
        {item === '跑步(椭圆机/跑步机)' && (
          <>
            <div className="head4">跑步(椭圆机/跑步机)</div>
            {data.eTip2.map(t => (
              <div className="paragraph">{t}</div>
            ))}
          </>
        )}
      </div>
      <div className="paragraph">
        {item === '骑车(自行车/动感单车)' && (
          <>
            <div className="head4">骑车(自行车/动感单车)</div>
            {data.eTip3.map(t => (
              <div className="paragraph">{t}</div>
            ))}
          </>
        )}
      </div>
      <div className="paragraph">
        {item === '游泳' && (
          <>
            <div className="head4">游泳</div>
            {data.eTip4.map(t => (
              <div className="paragraph">{t}</div>
            ))}
          </>
        )}
      </div>
      <div className="paragraph">
        {item === '舞蹈/健美操' && (
          <>
            <div className="head4">舞蹈/健美操</div>
            {data.eTip5.map(t => (
              <div className="paragraph">{t}</div>
            ))}
          </>
        )}
      </div>
      <div className="paragraph">
        {item === '太极拳/瑜伽' && (
          <>
            <div className="head4">太极拳/瑜伽</div>
            {data.eTip6.map(t => (
              <div className="paragraph">{t}</div>
            ))}
          </>
        )}
      </div>
      <div className="paragraph">
        {item === '跳绳' && (
          <>
            <div className="head4">跳绳</div>
            {data.eTip7.map(t => (
              <div className="paragraph">{t}</div>
            ))}
          </>
        )}
      </div>
    </>
  ));
  let anaPart1 = null;
  let anaPart2 = null;
  let anaPart3 = null;
  let anAerobicExercises = null;
  if (pushUp === '较差') {
    anaPart1 = data.anaTip1.map(i => <div className="paragraph">{i}</div>);
  } else if (pushUp === '一般') {
    anaPart1 = data.anaTip2.map(i => <div className="paragraph">{i}</div>);
  } else if (pushUp === '较好') {
    anaPart1 = data.anaTip3.map(i => <div className="paragraph">{i}</div>);
  } else {
    anaPart1 = null;
  }

  if (rollUp === '较差') {
    anaPart2 = data.anaTip4.map(i => <div className="paragraph">{i}</div>);
  } else if (rollUp === '一般') {
    anaPart2 = data.anaTip5.map(i => <div className="paragraph">{i}</div>);
  } else if (rollUp === '较好') {
    anaPart2 = data.anaTip6.map(i => <div className="paragraph">{i}</div>);
  } else {
    anaPart2 = null;
  }

  if (st === '较差') {
    anaPart3 = data.anaTip7.map(i => <div className="paragraph">{i}</div>);
  } else if (st === '一般') {
    anaPart3 = data.anaTip8.map(i => <div className="paragraph">{i}</div>);
  } else if (st === '较好') {
    anaPart3 = data.anaTip9.map(i => <div className="paragraph">{i}</div>);
  } else {
    anaPart3 = null;
  }

  let l1 = '';
  let l2 = '';
  let e1 = 0,
    e2 = 0,
    e3 = 0;
  switch (pushUp) {
    case '较差':
      e1++;
      break;
    case '一般':
      e2++;
      break;
    case '较好':
      e3++;
      break;
  }
  switch (rollUp) {
    case '较差':
      e1++;
      break;
    case '一般':
      e2++;
      break;
    case '较好':
      e3++;
      break;
  }
  switch (st) {
    case '较差':
      e1++;
      break;
    case '一般':
      e2++;
      break;
    case '较好':
      e3++;
      break;
  }
  switch (jj) {
    case '较差':
      e1++;
      break;
    case '一般':
      e2++;
      break;
    case '较好':
      e3++;
      break;
  }
  switch (sr) {
    case '较差':
      e1++;
      break;
    case '一般':
      e2++;
      break;
    case '较好':
      e3++;
      break;
  }

  if (e1 >= 3) {
    l1 = 'K1零基础';
  } else if (e1 === 3 && e2 === 2) {
    l1 = 'K2初学';
  } else if (e1 === 2 && e2 === 2 && e3 === 1) {
    l1 = 'K2初学';
  } else if (e1 === 2 && e2 === 1 && e3 === 2) {
    l1 = 'K2初学';
  } else if (e1 === 1 && e2 === 4) {
    l1 = 'K2初学';
  } else if (e1 === 1 && e2 === 2 && e3 === 1) {
    l1 = 'K2初学';
  } else if (e2 === 5) {
    l1 = 'K2初学';
  } else if (e1 === 2 && e3 === 3) {
    l1 = 'K3进阶';
  } else if (e1 === 1 && e2 === 2 && e3 === 2) {
    l1 = 'K3进阶';
  } else if (e1 === 1 && e2 === 1 && e3 === 3) {
    l1 = 'K3进阶';
  } else if (e1 === 1 && e3 === 4) {
    l1 = 'K3进阶';
  } else if (e2 === 4 && e3 === 1) {
    l1 = 'K3进阶';
  } else if (e2 === 3 && e3 === 2) {
    l1 = 'K3进阶';
  } else if (e2 === 2 && e3 === 3) {
    l1 = 'K4强化';
  } else if (e2 === 1 && e3 === 4) {
    l1 = 'K4强化';
  } else if (e3 === 5) {
    l1 = 'K4强化';
  } else {
    l1 = '';
  }

  l2 = base.compoundExercisePreference;
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
      <div className="paragraph">
        建议采用有氧运动和无氧运动相结合的运动整体方案。
      </div>
      <div className="head2">一、有氧运动</div>
      <div className="head3">1、运动频率和时间</div>
      <div className="paragraph">{aerobicExerciseTimeTip}</div>
      <div className="head3">2、运动内容</div>
      {exercises}

      <div className="head2">二、无氧运动</div>
      <div className="paragraph">{data.actionTip}</div>
      <div className="head3">1、运动频率和时间</div>
      <div className="paragraph">{anAerobicExerciseTimeTip}</div>
      <div className="head3">2、运动内容</div>
      <div className="head4">（1）上肢运动</div>
      {anaPart1}
      <div className="head4">（2）下肢运动</div>
      {anaPart3}
      <div className="head4">（3）核心</div>
      {anaPart2}
      <div className="head2">三、其他</div>
      <div className="paragraph">{`根据您的实际身体情况，推荐您在keep中选择级别为${l1}的自己喜爱的其它运动。每周可以一到两次的${l2}等无氧有氧混合式运动，来替换上述有氧或无氧运动安排。`}</div>
      {init.gender === '女' && (
        <>
          <div className="head2">四、经期运动注意事项</div>
          <div className="head3">1. 适宜人群</div>
          <div className="paragraph">{data.feTip1}</div>
          <div className="head3">2. 运动内容</div>
          <div className="paragraph">{data.feTip2}</div>
          <div className="head3">3. 运动禁忌</div>
          <div className="paragraph">{data.feTip3}</div>
          <div className="head3">4. 其他注意要点</div>
          <div className="paragraph">{data.feTip4}</div>
        </>
      )}
    </div>
  );
};

export default Recipe;
