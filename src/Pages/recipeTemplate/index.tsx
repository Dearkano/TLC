import * as React from 'react';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ISurvey, IData } from '@tlc';
import { Table } from 'antd';

import Target from './target';
import Overall from './overall';
import Recipe from './recipe';

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
  outputPath: string;
  imagesPath: string;
}

interface State {
  current: number;
}

export default class extends React.Component<Props, State> {
  state = {
    current: 1
  };
  componentDidMount() {
    console.log(this.props.item);
    this.print();
  }

  async h2c(pdf: any, id: string) {
    const { init } = this.props.item;
    const { current } = this.state;
    const that = this;
    let cur = current;
    const canvas = await html2canvas(document.getElementById(id));
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const pageHeight = (contentWidth / 595.28) * 841.89;
    let leftHeight = contentHeight;
    let position = 0;
    const imgWidth = 595.28;
    const imgHeight = (595.28 / contentWidth) * contentHeight;
    const pageData: string = canvas.toDataURL('image/jpeg', 1.0);

    if (leftHeight < pageHeight) {
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      while (leftHeight > 0) {
        pdf.addImage(
          pageData,
          'JPEG',
          0,
          position + 20 * current,
          imgWidth,
          imgHeight
        );
        leftHeight -= pageHeight;
        position -= 841.89;
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage();
        }
        cur++;
      }
    }
    that.setState({ current: cur });
  }

  async print() {
    const { item, callback, outputPath, imagesPath } = this.props;
    const { init, base } = item;
    const pdf = new jsPDF('', 'pt', 'a4');
    await this.h2c(pdf, `recipe-${init.id}-1`);
    const decode = getU8Array(pdf.output());
    fs.writeFileSync(`${outputPath}/recipe${init.id}.pdf`, decode);
    callback(init.id);
  }

  render() {
    const { item, imagesPath } = this.props;
    const { init, base } = item;
    return (
      <div id={`recipe${init.id}`} className="template">
        <Target item={item} />
        <Overall imagesPath={imagesPath} item={item} />
        <Recipe item={item} />
      </div>
    );
  }
}
