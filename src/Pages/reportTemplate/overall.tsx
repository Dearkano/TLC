import * as React from 'react';
import { ISurvey, IData } from '@tlc';
import data from '../../data/report/overall';
const fs = require('fs')

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
  const h1 = fs
  .readFileSync(`./src/images/static/整体建议.png`)
  .toString('base64');
  const h2 = fs
  .readFileSync(`./src/images/static/生活方式.png`)
  .toString('base64');
  const h3 = fs
  .readFileSync(`./src/images/static/吸烟.png`)
  .toString('base64');
  const h4 = fs
  .readFileSync(`./src/images/static/饮酒.png`)
  .toString('base64');
  const h5 = fs
  .readFileSync(`./src/images/static/睡眠.png`)
  .toString('base64');
  const h6 = fs
  .readFileSync(`./src/images/static/心理状态.png`)
  .toString('base64');
  const h7 = fs
  .readFileSync(`./src/images/static/健康检测.png`)
  .toString('base64');
  const h8 = fs
  .readFileSync(`./src/images/static/体检.png`)
  .toString('base64');
  const h9 = fs
  .readFileSync(`./src/images/static/智能检测设备.png`)
  .toString('base64');
  return (
    <div className="basic-module">
      <div className="row" style={{
       justifyContent: 'flex-start'
      }}>
        < img
          style={{ height: 100, marginLeft: '-40px' }}
          src={`data:image/png;base64,${h1}`}
        /></div>
      <div className="row">
        < img
          style={{ height: 100 }}
          src={`data:image/png;base64,${h2}`}
        /></div>
       <div className="row" style={{
       justifyContent: 'flex-start'
      }}>
        < img
          style={{ height: 65 }}
          src={`data:image/png;base64,${h3}`}
        /></div>
      {content1}
      <div className="row" style={{
       justifyContent: 'flex-start'
      }}>
        < img
          style={{ height: 70, marginLeft: '-15px' }}
          src={`data:image/png;base64,${h4}`}
        /></div>
      {content2}
      <div className="row" style={{
       justifyContent: 'flex-start'
      }}>
        < img
          style={{ height: 70 }}
          src={`data:image/png;base64,${h5}`}
        /></div>
      {content3}
      <div className="row">
        < img
          style={{ height: 100, marginLeft: '-40px' }}
          src={`data:image/png;base64,${h6}`}
        /></div>
      {content4}
      <div className="row">
        < img
          style={{ height: 100, marginLeft: '-40px' }}
          src={`data:image/png;base64,${h7}`}
        /></div>
    <div className="row" style={{
       justifyContent: 'flex-start'
      }}>
        < img
          style={{ height: 80, marginLeft: '-70px' }}
          src={`data:image/png;base64,${h8}`}
        /></div>
      {content5}
      {content6}
      <div className="row" style={{
       justifyContent: 'flex-start'
      }}>
        < img
          style={{ height: 100, marginLeft: '-30px' }}
          src={`data:image/png;base64,${h9}`}
        /></div>
      {content7}
    </div>
  );
};

export default Overall;
