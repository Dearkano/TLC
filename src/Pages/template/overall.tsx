import * as React from 'react';
import data from '../../data/overall';
import { ISurvey } from '@tlc';

interface P {
  item: ISurvey;
}

const Overall: React.SFC<P> = ({ item }) => {
    let content1 = ''
    let content2 = ''
    
  return (
    <div className="basic-module">
      <div className="head2">（二）整体建议</div>
      <div className="head3">一、基本运动情况</div>
      <div className="head3">1、久坐情况</div>
      <div className="paragraph">{content1}</div>
      <div className="head3">2、运动频率</div>
      <div className="paragraph"> </div>
    </div>
  );
};

export default Overall;
