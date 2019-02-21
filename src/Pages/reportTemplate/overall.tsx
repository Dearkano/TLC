import * as React from 'react';
import { ISurvey, IData } from '@tlc';
import data from '../../data/report/overall';

interface P {
  item: IData;
}
const Overall: React.SFC<P> = ({ item }) => {
  const { init, base, addition } = item;
  let content1 = null;

  if (base.somkingNumber === '0，不吸烟') {
    content1 = data.smoke.tip1.map(i => <div className="paragraph">{i}</div>);
  } else if (base.somkingNumber === '5支左右') {
    content1 = data.smoke.tip2.map(i => <div className="paragraph">{i}</div>);
  } else if (base.somkingNumber === '10支左右') {
    content1 = data.smoke.tip3.map(i => <div className="paragraph">{i}</div>);
  } else if (base.somkingNumber === '20支左右') {
    content1 = data.smoke.tip4.map(i => <div className="paragraph">{i}</div>);
  } else if (base.somkingNumber === '经常大于一包') {
    content1 = data.smoke.tip5.map(i => <div className="paragraph">{i}</div>);
  }

  let content2 = null;
  if (base.drinkingNumber === '0，不饮酒') {
    content2 = data.drink.tip1.map(i => <div className="paragraph">{i}</div>);
  } else if (base.drinkingNumber === '1-2次') {
    content2 = data.drink.tip2.map(i => <div className="paragraph">{i}</div>);
  } else if (base.drinkingNumber === '3-4次') {
    content2 = data.drink.tip3.map(i => <div className="paragraph">{i}</div>);
  } else if (base.drinkingNumber === '5-7次') {
    content2 = data.drink.tip4.map(i => <div className="paragraph">{i}</div>);
  }

  const content3 = data.sleep.map(i => <div className="paragraph">{i}</div>);
  const content4 = data.psyState.map(i => <div className="paragraph">{i}</div>);

  let content5 = null;
  if (base.physicalExamination === '是') {
    content5 = <div className="paragraph">您近期没有体检。</div>;
  } else if (base.physicalExamination === '否') {
    content5 = (
      <div className="paragraph">您有每1-2年进行一次体检的好习惯，很好。</div>
    );
  } else {
    content5 = null;
  }
  const content6 = <div className="paragraph">{data.examination}</div>;

  const content7 = data.smartExamination.map(i => (
    <div className="paragraph">{i}</div>
  ));


  return (
    <div className="basic-module">
      <div className="head2">（二）整体建议</div>
      <div className="head3">一、生活方式</div>
      <div className="head4">1、吸烟</div>
      {content1}
      <div className="head4">2、饮酒</div>
      {content2}
      <div className="head4">3、睡眠</div>
      {content3}
      <div className="head3">二、心理状态</div>
      {content4}
      <div className="head3">三、健康检测</div>
      <div className="head4">1、体检</div>
      {content5}
      {content6}
      <div className="head4">2、智能检测设备</div>
      {content7}
    </div>
  );
};

export default Overall;
