import * as React from 'react';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

const fs = require('fs');

function getU8Array(data: any) {
  let len = data.length;
  const u8 = new Uint8Array(len);
  while (len--) u8[len] = data.charCodeAt(len);
  return u8;
}

interface Props {
  item: number;
}

interface State {}

export default class extends React.Component<Props, State> {
  componentDidMount() {
    this.print();
  }
  print() {
    const { item } = this.props;
    html2canvas(document.getElementById(`print${item}`)).then(function(
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

      const pageData = canvas.toDataURL('image/jpeg', 1.0);

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
      fs.writeFileSync(`./output/${item}.pdf`, decode);
    });
  }

  render() {
    const { item } = this.props;
    let r = [];
    for (let i = item; i < item*120; i++) {
      r.push(i);
    }
    return (
      <div id={`print${item}`}>
        {r.map(i => (
          <h2>Welcome to React with Typescript！！!{i}</h2>
        ))}
      </div>
    );
  }
}
