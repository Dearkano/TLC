import * as React from 'react';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ISurvey, IData } from '@tlc';

import BasicInformation from './basic';
import DietPlan from './dietPlan';
import Overall from './overall';
import Reference from './reference'

const fs = require('fs');

function getU8Array(data: any) {
  let len = data.length;
  const u8 = new Uint8Array(len);
  while (len--) { u8[len] = data.charCodeAt(len); }
  return u8;
}

interface Props {
  item: IData;
  callback: (id: number) => void;
  outputPath: string;
  imagesPath: string;
}

interface State { }

export default class extends React.Component<Props, State> {
  componentDidMount() {
    const that = this
    setTimeout(() => {
      that.print();
    }, 2000);
  }
  async print() {
    const { item, callback, outputPath } = this.props;
    const { init, base } = item;
    console.log('print report for ' + init.name)
    const canvas = await html2canvas(document.getElementById(`report-${init.name}`));
    // const contentWidth = canvas.width;
    // const contentHeight = canvas.height;
    // const pageHeight = (contentWidth / 595.28) * 841.89;
    // let leftHeight = contentHeight;
    // let position = 0;
    // const imgWidth = 595.28;
    // const imgHeight = (595.28 / contentWidth) * contentHeight;
    const pageData: string = canvas.toDataURL('image/jpeg', 1.0);

    // const pdf = new jsPDF('', 'pt', 'a4');

    // if (leftHeight < pageHeight) {
    //   pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    // } else {
    //   while (leftHeight > 0) {
    //     console.log(position);
    //     pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
    //     leftHeight -= pageHeight;
    //     position -= 841.89;
    //     //避免添加空白页
    //     if (leftHeight > 0) {
    //       pdf.addPage();
    //     }
    //   }
    // }

    const d = pageData.split('base64,')[1]
    const buffer = new Buffer(d, 'base64')
    fs.writeFileSync(`${outputPath}/TLC健康报告${init.id}-${init.name}.jpeg`, buffer);
    callback(init.id);
  }

  render() {
    const { item } = this.props;
    const { init, base } = item;
    const titlePhoto = fs
      .readFileSync(`./src/images/titleDec.png`)
      .toString('base64');
    const headPhoto = fs
      .readFileSync(`./src/images/static/头图.png`)
      .toString('base64');
    const back = fs.readFileSync(`./src/images/back6.jpg`).toString('base64');
    return (
      <div id={`report-${init.name}`} className="template"
        style={{ backgroundImage: `url(data:image/jpg;base64,${back})`, backgroundSize: 'cover' }}>
        <div className="row" style={{ height: 300, marginBottom: '1.5rem' }}>
          {/* <img
            style={{ height: 40, marginLeft: 60 }}
            src={`data:image/png;base64,${titlePhoto}`}
          />
          <div
            className="head1 center"
            style={{ height: '100%', lineHeight: '40px', marginBottom: 0 }}
          >
            TLC健康管理方案
          </div>
          <img
            style={{ height: 40, marginRight: 60 }}
            src={`data:image/png;base64,${titlePhoto}`}
          /> */}
          <img
            style={{ height: 300 }}
            src={`data:image/png;base64,${headPhoto}`}
          />
        </div>
        <BasicInformation item={item} />
        <Overall item={item} />
        <DietPlan item={item} />
        <Reference />
      </div>
    );
  }
}
