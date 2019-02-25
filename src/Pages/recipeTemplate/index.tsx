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

interface State {}

export default class extends React.Component<Props, State> {
  componentDidMount() {
    console.log(this.props.item);
    this.print();
  }
  print() {
    const { item, callback, outputPath, imagesPath } = this.props;
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
      console.log(
        'content width=' + contentWidth + '; content height=' + contentHeight
      );
      console.log('image height = ' + imgHeight);

      const pageData: string = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF('', 'pt', 'a4');
      let current = 1;
      if (leftHeight < pageHeight) {
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          console.log(position);
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
          current++;
        }
      }

      const decode = getU8Array(pdf.output());
      fs.writeFileSync(`${outputPath}/recipe${init.id}.pdf`, decode);
      callback(init.id);
    });
  }

  render() {
    const { item, imagesPath } = this.props;
    const { init, base } = item;
    return (
      <div id={`print${init.id}`} className="template">
        <div className="head1">TLC个性化运动处方</div>
        <Target item={item} />
        <Overall imagesPath={imagesPath} item={item} />
        <Recipe item={item} />
      </div>
    );
  }
}
