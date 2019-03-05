import * as React from 'react';
import data from '../../data/recipe/overall';
import { ISurvey, IData } from '@tlc';

const fs = require('fs');

interface P {
  item: IData;
  imagesPath: string;
  front: number;
  side: number;
}

export default class extends React.Component<P> {
  render() {
    const { item, imagesPath, front, side } = this.props
    console.log('---------------------------------')
    console.log('rerender')
    console.log(front)
    const { init, base, addition } = item;
    let content1 = '';
    let content21 = null;
    let content22 = null;

    if (base.sittingTime === '3小时以下') {
      content1 = data.content1;
    } else if (base.sittingTime === '3-6小时') {
      content1 = data.content2;
    } else if (base.sittingTime === '6-9小时') {
      content1 = data.content3;
    } else if (base.sittingTime === '9-12小时') {
      content1 = data.content4;
    } else if (base.sittingTime === '12小时以上') {
      content1 = data.content5;
    } else {
      content1 = '无';
    }
    const back5 = fs.readFileSync(`./src/images/back5.png`).toString('base64');
    const tipBg1 = fs.readFileSync(`./src/images/tip1.png`).toString('base64');
    const tipBg2 = fs.readFileSync(`./src/images/tip2.png`).toString('base64');
    const bg1 = fs.readFileSync(`./src/images/bg1.png`).toString('base64');
    const bg2 = fs.readFileSync(`./src/images/bg2.png`).toString('base64');

    content21 = data.tips1.map((item, index) => (
      <div
        className={`paragraph ${index % 2 === 0 ? 'tip1' : 'tip2'}`}
        style={{
          backgroundImage: `url(data:image/png;base64,${
            index % 2 === 0 ? tipBg1 : tipBg2
            })`
        }}
      >
        {item}
      </div>
    ));
    content22 = data.tips2.map((item, index) => (
      <div
        className={`paragraph ${index % 2 === 0 ? 'tip1' : 'tip2'}`}
        style={{
          backgroundImage: `url(data:image/png;base64,${
            index % 2 === 0 ? tipBg1 : tipBg2
            })`
        }}
      >
        {item}
      </div>
    ));
    let content3 = '';
    if (base.weeklyExerciseNumber === '1-2次/周  ') {
      content3 = data.content6;
    } else if (base.weeklyExerciseNumber === '小于1次/周') {
      content3 = data.content7;
    } else if (base.weeklyExerciseNumber === '3-4次/周  ') {
      content3 = data.content8;
    } else if (base.weeklyExerciseNumber === '5次及以上/周') {
      content3 = data.content9;
    } else {
      content3 = '';
    }

    let content4 = null;
    const reasons = base.noExerciseReasons.split('，');
    content4 = (
      <>
        <div className="paragraph">
          {reasons.indexOf('没时间') !== -1 && data.rTip1}{' '}
        </div>
        <div className="paragraph">
          {reasons.indexOf('没场地') !== -1 && data.rTip2}{' '}
        </div>
        <div className="paragraph">
          {reasons.indexOf('没气氛') !== -1 && data.rTip3}{' '}
        </div>
        <div className="paragraph">
          {reasons.indexOf('没人带/指导') !== -1 && data.rTip4}{' '}
        </div>
        <div className="paragraph">
          {reasons.indexOf('装备器材限制') !== -1 && data.rTip5}{' '}
        </div>
        <div className="paragraph">
          {reasons.indexOf('个人主观因素') !== -1 && data.rTip6}
        </div>
        <div className="paragraph">{reasons.indexOf('无') !== -1 && '无'}</div>
      </>
    );
    const content4triggers = [
      '没时间',
      '没场地',
      '没气氛',
      '没人带/指导',
      '装备器材限制',
      '个人主观因素',
      '无'
    ];
    let content4valid = false;
    for (const i of content4triggers) {
      if (reasons.indexOf(i) !== -1) {
        content4valid = true;
        break;
      }
    }
    if (!content4valid) {
      content4 = <div className="paragraph">无</div>;
    }
    // if(base.noExerciseReasons)
    let content5 = '';
    if (base.commuterTransportation === '步行') {
      content5 = data.transtip1;
    } else if (base.commuterTransportation === '自行车') {
      content5 = data.transtip2;
    } else if (
      base.commuterTransportation === '乘坐私车、公司班车，自己开车骑电动车'
    ) {
      content5 = data.transtip3;
    } else if (base.commuterTransportation === '乘坐地铁或公交车') {
      content5 = data.transtip4;
    } else {
      content5 = '';
    }

    let content6 = null;
    const symptoms = base.recentSymptoms.split('，');
    content6 = (
      <>
        <div className="paragraph">
          {symptoms.indexOf('无') !== -1 && data.syTip1}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('疲乏无力') !== -1 && data.syTip2}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('休息后，疲劳不能缓解') !== -1 && data.syTip3}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('肌肉酸痛') !== -1 && data.syTip4}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('腰背酸痛') !== -1 && data.syTip5}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('关节无力酸软') !== -1 && data.syTip6}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('轻微运动后心慌气短') !== -1 && data.syTip7}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('更容易出汗(排除季节原因)') !== -1 && data.syTip8}
        </div>
        <div className="paragraph">
          {symptoms.indexOf('双腿沉重，走路无力') !== -1 && data.syTip9}
        </div>
      </>
    );
    const content6Triggers = [
      '无',
      '休息后，疲劳不能缓解',
      '肌肉酸痛',
      '腰背酸痛',
      '关节无力酸软',
      '轻微运动后心慌气短',
      '更容易出汗(排除季节原因)',
      '双腿沉重，走路无力'
    ];
    let content6valid = false;
    for (const i of content6Triggers) {
      if (symptoms.indexOf(i) !== -1) {
        content6valid = true;
        break;
      }
    }
    if (!content6valid) {
      content6 = <div className="paragraph">{data.syTip1}</div>;
    }
    let frontPhoto = ''
    let frontNeedRotate = false;
    let sideNeedRotate = false;
    try {
      frontPhoto = fs
        .readFileSync(`${imagesPath}/${addition.name}/正面.jpg`)
        .toString('base64');
    } catch {
      try {
        frontPhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/正面.jpeg`)
          .toString('base64');
      } catch {
        frontPhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/正面.png`)
          .toString('base64');
      }
    }
    let sidePhoto = ''
    try {
      sidePhoto = fs
        .readFileSync(`${imagesPath}/${addition.name}/侧面.jpg`)
        .toString('base64');
    } catch {
      try {
        sidePhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/侧面.jpeg`)
          .toString('base64');
      } catch {
        sidePhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/侧面.png`)
          .toString('base64');
      }
    }

    const icon1 = fs.readFileSync(`./src/images/icon1.png`).toString('base64');
    const eTips = data.eTip.map(i => <div className="paragraph">{i}</div>);
    console.log('----------------------------------------')
    console.log('front ' + front + ' side' + side)
    return (
      <>
        <div id={`recipe-${init.id}-2`} className="template" style={{
          backgroundImage: `url(data:image/png;base64,${back5})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
          <div
            className="basic-module"
            style={{
              marginTop: '70px'
            }}
          >
            <div className="head2">（二）整体建议</div>
            <div
              className="head3"
              style={{ color: '#5f7f41', fontWeight: 'bolder' }}
            >
              基本运动情况
          </div>
            <div className="row">
              <img
                style={{ width: '80px' }}
                src={`data:image/png;base64,${icon1}`}
              />
              <div className="head4" style={{ color: '#5f7f41' }}>
                久坐情况
            </div>
            </div>
            <div className="paragraph">{content1}</div>
            <div className="paragraph">{content21}</div>
          </div>
        </div>
        <div id={`recipe-${init.id}-3`} className="template" style={{
          backgroundImage: `url(data:image/png;base64,${back5})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
          <div
            className="basic-module"
            style={{
              marginTop: '70px'
            }}
          >
            <div className="paragraph">{content22}</div>
          </div>
        </div>
        <div id={`recipe-${init.id}-4`} className="template" style={{
          backgroundImage: `url(data:image/png;base64,${back5})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
          <div
            className="basic-module"
            style={{
            }}
          >
            <div>
              <div className="row">
                <img
                  style={{ width: '80px' }}
                  src={`data:image/png;base64,${icon1}`}
                />
                <div className="head4" style={{ color: '#5f7f41' }}>
                  运动频率
              </div>
              </div>
              <div className="paragraph">{content3}</div>
              <div className="row">
                <img
                  style={{ width: '80px' }}
                  src={`data:image/png;base64,${icon1}`}
                />
                <div className="head4" style={{ color: '#5f7f41' }}>
                  动机与条件克服
              </div>
              </div>
              <div className="paragraph">{content4}</div>
              <div className="row">
                <img
                  style={{ width: '80px' }}
                  src={`data:image/png;base64,${icon1}`}
                />
                <div className="head4" style={{ color: '#5f7f41' }}>
                  出行建议
              </div>
              </div>
              <div className="paragraph">{content5}</div>
              <div className="row">
                <img
                  style={{ width: '80px' }}
                  src={`data:image/png;base64,${icon1}`}
                />
                <div className="head4" style={{ color: '#5f7f41' }}>
                  健康状况
              </div>
              </div>
              <div className="paragraph">{content6}</div>
            </div>
          </div>
        </div>
        <div id={`recipe-${init.id}-5`} className="template" style={{
          backgroundImage: `url(data:image/png;base64,${back5})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
          <div
            className="basic-module"
            style={{
            }}
          >
            <div
            >
              <div
                className="head3"
                style={{
                  color: '#5f7f41',
                  fontWeight: 'bolder',
                  textAlign: 'center'
                }}
              >
                体态评估情况
            </div>
              <div className="row" style={{ marginBottom: '40px' }}>
                <img
                  style={{ width: '150px', transform: front === 1 ? 'rotate(90deg)' : front === 2 ? 'rotate(-90deg)' : '' }}
                  src={`data:image/png;base64,${frontPhoto}`}
                />
                <img
                  style={{ width: '150px', marginLeft: '100px', transform: side === 1 ? 'rotate(90deg)' : side === 2 ? 'rotate(-90deg)' : '' }}
                  src={`data:image/png;base64,${sidePhoto}`}
                /></div>

              <div className="paragraph">
                经过评估，您的体态<b>{addition.evaluation}</b>
              </div>
              {eTips}
              {addition.evaluation.includes('骨盆前倾') && (
                <div className="paragraph">{data.eTip1}</div>
              )}
              {addition.evaluation.includes('颈前伸') && (
                <div className="paragraph">{data.eTip2}</div>
              )}
              {addition.evaluation.includes('驼背圆肩') && (
                <div className="paragraph">{data.eTip3}</div>
              )}
              {addition.evaluation.includes('足内翻') && (
                <div className="paragraph">{data.eTip4}</div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}