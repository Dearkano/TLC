import * as React from 'react';
import data from '../../data/recipe/target';
import { ISurvey, IData } from '@tlc';
import { Timeline } from 'antd';

const fs = require('fs');

interface P {
  item: IData;
}
const Target: React.SFC<P> = ({ item }) => {
  const { init, base } = item;
  let content = null;
  if (init.BMI >= 28) {
    content = (
      <>
        <div className="paragraph">{data.content11}</div>
        <div className="paragraph">{data.content12}</div>
      </>
    );
  } else if (
    init.BMI <= 28 &&
    ((init.gender === '男' && init.fatRate > 20) ||
      (init.gender === '女' && init.fatRate > 30))
  ) {
    content = (
      <>
        <div className="paragraph">{data.content21}</div>
        <div className="paragraph">{data.content22}</div>
      </>
    );
  } else {
    content = (
      <>
        <div className="paragraph">{data.content31}</div>
        <div className="paragraph">{data.content32}</div>
      </>
    );
  }

  let waistline = 0;
  let content1 = '';
  if (
    (init.gender === '男' && init.waistline > 100) ||
    (init.gender === '女' && init.waistline > 90)
  ) {
    waistline = Math.round(init.waistline * 0.08);
    content1 = data.content4;
  } else if (
    (init.gender === '男' && init.waistline < 100 && init.waistline >= 90) ||
    (init.gender === '女' && init.waistline < 90 && init.waistline >= 80)
  ) {
    waistline = Math.round(init.waistline * 0.06);
    content1 = data.content5;
  } else {
    waistline = Math.round(init.waistline * 0.04);
    content1 = data.content6;
  }
  const back5 = fs.readFileSync(`./src/images/back5.png`).toString('base64');
  const bg1 = fs.readFileSync(`./src/images/bg1.png`).toString('base64');
  const head = fs.readFileSync(`./src/images/head.png`).toString('base64');
  const titlePhoto = fs
    .readFileSync(`./src/images/titleDec.png`)
    .toString('base64');
  return (
    <>
      <div className="row" style={{ height: 40, marginBottom: '1.5rem' }}>
        <img
          style={{ height: 40, marginLeft: 60 }}
          src={`data:image/png;base64,${titlePhoto}`}
        />
        <div
          className="head1 center"
          style={{ height: '100%', lineHeight: '40px', marginBottom: 0 }}
        >
          TLC个性化运动处方
          </div>
        <img
          style={{ height: 40, marginRight: 60 }}
          src={`data:image/png;base64,${titlePhoto}`}
        />
      </div>
      <div
      >
        <img
          style={{ width: '400px' }}
          src={`data:image/png;base64,${head}`}
        />
        <div
          style={{
            position: 'absolute',
            marginTop: '-140px',
            fontSize: '14px',
            color: 'white',
            marginLeft: '43px',
            fontWeight: 'bolder'
          }}
        >
          {init.name}
        </div>

        <div className="head2">（一）目标</div>
        <div className="head3">1. 减脂</div>
        {content}
        <div className="head3">2. 腰围减少{waistline}cm</div>
        <div className="paragraph">{content1}</div>
      </div>
    </>
  );
};

export default Target;
