import * as React from 'react';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ISurvey, IData } from '@tlc';
import { Table } from 'antd';

import Target from './target';
import Overall from './overall';
import Recipe from './recipe';
import { needConvertImage } from '../../Utils/img'

const fs = require('fs');
const canvas2image = require('canvas2image')

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

interface State {
  front: number;
  side: number;
}

export default class extends React.Component<Props, State> {
  state: State = {
    front: 0,
    side: 0
  }
  async componentDidMount() {
    const { item, imagesPath } = this.props
    const { init, base, addition } = item;
    let frontPhoto = ''
    let frontNeedRotate = 0;
    let sideNeedRotate = 0;
    try {
      frontPhoto = fs
        .readFileSync(`${imagesPath}/${addition.name}/正面.jpg`)
        .toString('base64');
      frontNeedRotate = await needConvertImage(`${imagesPath}/${addition.name}/正面.jpg`)
    } catch {
      try {
        frontPhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/正面.jpeg`)
          .toString('base64');
        frontNeedRotate = await needConvertImage(`${imagesPath}/${addition.name}/正面.jpeg`)
        console.log('===================================')
        console.log(frontNeedRotate)
      } catch {
        frontPhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/正面.png`)
          .toString('base64');
        frontNeedRotate = await needConvertImage(`${imagesPath}/${addition.name}/正面.png`)
      }
    }
    let sidePhoto = ''
    try {
      sidePhoto = fs
        .readFileSync(`${imagesPath}/${addition.name}/侧面.jpg`)
        .toString('base64');
      sideNeedRotate = await needConvertImage(`${imagesPath}/${addition.name}/侧面.jpg`)
    } catch {
      try {
        sidePhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/侧面.jpeg`)
          .toString('base64');
        sideNeedRotate = await needConvertImage(`${imagesPath}/${addition.name}/侧面.jpg`)
      } catch {
        sidePhoto = fs
          .readFileSync(`${imagesPath}/${addition.name}/侧面.png`)
          .toString('base64');
        sideNeedRotate = await needConvertImage(`${imagesPath}/${addition.name}/侧面.png`)
      }
    }
    console.log('===================================')
    console.log('===================================')
    console.log('===================================')
    console.log(frontNeedRotate)
    this.setState({ front: frontNeedRotate, side: sideNeedRotate }, () => this.print())

  }

  async h2c(pdf: any, ele: any) {
    const { init } = this.props.item;
    const that = this;
    const canvas = await html2canvas(ele);
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;
    const pageHeight = (contentWidth / 595.28) * 841.89;
    let leftHeight = contentHeight;
    const imgWidth = 595.28;
    const imgHeight = (595.28 / contentWidth) * contentHeight;
    const pageData: string = canvas.toDataURL('image/jpeg', 1.0);

    // if (leftHeight < pageHeight) {
    //   pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
    // } else {
    //   while (leftHeight > 0) {
    //     pdf.addImage(
    //       pageData,
    //       'JPEG',
    //       0,
    //       position + 20 * current,
    //       imgWidth,
    //       imgHeight
    //     );
    //     leftHeight -= pageHeight;
    //     pos -= 841.89;
    //     //避免添加空白页
    //     if (leftHeight > 0) {
    //       pdf.addPage();
    //     }
    //     cur++;
    //   }
    // }

    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
  }

  async print() {

    const { item, callback, outputPath, imagesPath } = this.props;
    const { init, base } = item;
    console.log('print recipe for ' + init.name)
    // const pdf = new jsPDF('', 'pt', 'a4');
    // const eles = document.getElementsByClassName('template');
    // console.log(eles)
    // for (let i = 0; i < eles.length; i++) {
    //   console.log('now i = ' + i)
    //   await this.h2c(pdf, eles[i]);
    //   if (i !== eles.length - 1) {
    //     pdf.addPage();
    //   }
    // }
    // const decode = getU8Array(pdf.output());
    // fs.writeFileSync(`${outputPath}/${init.name}.pdf`, decode);
    const ele = document.getElementById(`recipe-${this.props.item.init.name}`)
    const canvas = await html2canvas(ele);
    const pageData: string = canvas.toDataURL('image/jpeg', 1.0).replace(/\s/g, '+');
    const d = pageData.split('base64,')[1]
    const buffer = new Buffer(d, 'base64')
    console.log(ele)
    console.log(d)
    fs.writeFileSync(`${outputPath}/TLC个性处方-${init.id}-${init.name}.jpeg`, buffer);
    callback(init.id);
    console.log('print recipe over for ' + init.name)
  }

  render() {
    const { item, imagesPath } = this.props;
    console.log(item)
    const { front, side } = this.state
    const back = fs.readFileSync(`./src/images/back6.jpg`).toString('base64');

    // const { init, base } = item;
    return (
      <div id={`recipe-${item.init.name}`} className="template"
        style={{ backgroundImage: `url(data:image/jpg;base64,${back})`, backgroundSize: 'cover' }}>
        <Target item={item} />
        <Overall imagesPath={imagesPath} item={item} front={front} side={side} />
        <Recipe item={item} />
      </div>
    );
  }
}
