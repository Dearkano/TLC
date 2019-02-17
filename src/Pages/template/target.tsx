import * as React from 'react';
import data from '../../data/target';
import { ISurvey } from '@tlc';

interface P {
  item: ISurvey;
}
const Target: React.SFC<P> = ({ item }) => {
  let content = null;
  if (item.BMI >= 28) {
    content = (
      <>
        <div className="paragraph">{data.content11}</div>
        <div className="paragraph">{data.content12}</div>
      </>
    );
  } else if (
    item.BMI <= 28 &&
    ((item.gender === '男' && item.fatRate > 20) ||
      (item.gender === '女' && item.fatRate > 30))
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
    (item.gender === '男' && item.waistline > 100) ||
    (item.gender === '女' && item.waistline > 90)
  ) {
    waistline = Math.round(item.waistline * 0.08);
    content1 = data.content4;
  } else if (
    (item.gender === '男' && item.waistline < 100 && item.waistline >= 90) ||
    (item.gender === '女' && item.waistline < 90 && item.waistline >= 80)
  ) {
    waistline = Math.round(item.waistline * 0.06);
    content1 = data.content5;
  } else {
    waistline = Math.round(item.waistline * 0.04);
    content1 = data.content6;
  }

  return (
    <div className="basic-module">
      <div>{item.name}</div>
      <div className="head2">（一）目标</div>
      <div className="head3">1. 减脂</div>
      {content}
      <div className="head3">2. 腰围减少{waistline}cm</div>
      <div className="paragraph">{content1}</div>
    </div>
  );
};

export default Target;
