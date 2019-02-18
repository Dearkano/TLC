import * as React from 'react';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ISurvey, IData } from '@tlc';
import { Table } from 'antd';

import Target from './target';
import Overall from './overall';

const fs = require('fs');

function getU8Array(data: any) {
  let len = data.length;
  const u8 = new Uint8Array(len);
  while (len--) u8[len] = data.charCodeAt(len);
  return u8;
}

interface Props {
  item: IData;
  callback: (id: number) => void;
  path: string;
}

interface State {}

export default class extends React.Component<Props, State> {
  componentDidMount() {
    console.log(this.props.item);
    this.print();
  }
  print() {
    const { item, callback, path } = this.props;
    const { init, base } = item;
    html2canvas(document.getElementById(`print${init.id}`)).then(function(
      canvas: any
    ) {
      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      console.log('height = ' + contentHeight);
      console.log('width = ' + contentWidth);
      const pageHeight = (contentWidth / 595.28) * 841.89;
      let leftHeight = contentHeight;
      let position = 0;
      const imgWidth = 595.28;
      const imgHeight = (595.28 / contentWidth) * contentHeight;
      console.log('image height = ' + imgHeight);

      const pageData: string = canvas.toDataURL('image/jpeg', 1.0);
      const s = pageData.replace('data:image/jpeg;base64,', '');
      fs.writeFileSync(
        `${path}/test.jpeg`,
        pageData.replace('data:image/jpeg;base64,', '')
      );

      const pdf = new jsPDF('', 'pt', 'a4');

      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          console.log(position);
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }

      const decode = getU8Array(pdf.output());
      fs.writeFileSync(`${path}/${init.id}.pdf`, decode);
      callback(init.id);
    });
  }

  render() {
    const { item } = this.props;
    const { init, base } = item;
    return (
      <div id={`print${init.id}`} className="template">
        <div className="head1">TLC个性化运动处方</div>
        {/* <BasicInformation item={item} />
        <DietPlan item={item} /> */}
        <Target item={item} />
        <Overall item={item} />
      </div>
    );
  }
}

interface P {
  item: ISurvey;
}
const BasicInformation: React.SFC<P> = ({ item }) => {
  const columns1 = [
    { title: '身高\n(cm)', key: 'height', dataIndex: 'height', width: 100 },
    { title: '体重\n(kg)', key: 'weight', dataIndex: 'weight', width: 100 },
    {
      title: '腰围\n(cm)',
      key: 'waistline',
      dataIndex: 'waistline',
      width: 100
    },
    { title: 'BMI\n(kg/m^2)', key: 'BMI', dataIndex: 'BMI', width: 100 },
    {
      title: '目标体重\n(kg)',
      key: 'target28days',
      dataIndex: 'target28days',
      width: 100
    },
    {
      title: '目标腰围\n(cm)',
      key: 'targetWaistline',
      dataIndex: 'targetWaistline',
      width: 100
    }
  ];

  const columns2 = [
    {
      title: '基础代谢\n(Kcal)',
      key: 'restingEnergyComsumption',
      dataIndex: 'restingEnergyComsumption',
      width: 100
    },
    { title: '体脂率\n(%)', key: 'fatRate', dataIndex: 'fatRate', width: 100 },
    {
      title: '骨骼肌重量\n(kg)',
      key: 'muscle',
      dataIndex: 'muscle',
      width: 100
    },
    {
      title: '血压\n(mmHg)',
      key: 'bloodPressure',
      dataIndex: 'bloodPressure',
      width: 100
    },
    { title: '内脏脂肪', key: 'VAT', dataIndex: 'VAT', width: 100 }
  ];

  const rows = [item];

  return (
    <div className="basic-module">
      <div className="head2">一、基本信息</div>
      <div className="basic-table">
        <div className="text-center table-title">体格测量</div>
        <Table dataSource={rows} columns={columns1} pagination={false} />
      </div>
      <div className="basic-table">
        <div className="text-center table-title">体成分测量</div>
        <Table dataSource={rows} columns={columns2} pagination={false} />
      </div>
    </div>
  );
};

const DietPlan: React.SFC<P> = ({ item }) => {
  return (
    <div className="basic-module">
      <div className="head2">二、饮食方案</div>
      <div className="head3">(一)、总能量：1900Kcal</div>
    </div>
  );
};
