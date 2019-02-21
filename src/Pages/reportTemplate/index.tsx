import * as React from 'react';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ISurvey, IData } from '@tlc';

import BasicInformation from './basic';
import DietPlan from './dietPlan';
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
      fs.writeFileSync(`${path}/report${init.id}.pdf`, decode);
      callback(init.id);
    });
  }

  render() {
    const { item } = this.props;
    const { init, base } = item;
    return (
      <div id={`print${init.id}`} className="template">
        <div className="head1">TLC个性化运动处方</div>
        <BasicInformation item={item} />
        <Overall item={item} />
        <DietPlan item={item} />
      </div>
    );
  }
}
