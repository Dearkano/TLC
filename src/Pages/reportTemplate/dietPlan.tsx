import * as React from 'react';
import { ISurvey, IData } from '@tlc';

interface P {
  item: IData;
}

const DietPlan: React.SFC<P> = ({ item }) => {
  return (
    <div className="basic-module">
      <div className="head2">二、饮食方案</div>
      <div className="head3">(一)、总能量：1900Kcal</div>
    </div>
  );
};

export default DietPlan