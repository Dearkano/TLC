import * as React from 'react'
import { ISurvey, IData } from '@tlc';

interface P {
    item: IData;
  }
const Overall:React.SFC<P> =({item})=>{
    return (
        <div className="basic-module">
           <div className="head2">一、生活方式</div>
           <div className="head3">1、吸烟</div>
        </div>
    )
}

export default Overall