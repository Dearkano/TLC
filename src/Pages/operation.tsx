import * as React from 'react';
import { Upload, Icon, message, Button, Progress } from 'antd';
import Template from './template';
import { readFile } from '../Utils/xlsx';
import { ISurvey } from '@tlc';
const Dragger = Upload.Dragger;

interface Props {}
interface State {
  data: ISurvey[];
  renderOver: boolean[];
  filepath1: string;
  disable: boolean;
  outputPath: string;
}

export default class extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      renderOver: [],
      filepath1: '',
      disable: true,
      outputPath: ''
    };
  }
  componentDidMount() {
    // const data = readFile().slice(1);
    //this.setState({ data });
  }
  print() {
    const { filepath1 } = this.state;
    if (!filepath1) {
      message.error('请输入文件后再生成报告');
      return;
    }
    const data = readFile(filepath1).slice(1);
    const renderOver: boolean[] = [];
    for (const i in data) {
      renderOver[i] = false;
    }
    this.setState({ data: [], renderOver: [] }, () =>
      this.setState({ data, renderOver })
    );
  }

  destory = (id: number) => {
    const renderOver = this.state.renderOver;
    renderOver[id] = true;
    this.setState({ renderOver });
  };

  onXls1Change = (info: any) => {
    const filepath = info.file.originFileObj.path;
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      if (filepath.indexOf('xls') === -1) {
        message.error(`${info.file.name} 文件格式错误.`);
      } else {
        if (this.state.outputPath) {
          this.setState({ filepath1: filepath, disable: false });
        } else {
          this.setState({ filepath1: filepath });
        }
        message.success(`${info.file.name} 文件上传成功.`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  onOutputChange = (info: any) => {
    const filepath = info.file.originFileObj.path;
    console.log(info);
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      if (this.state.filepath1) {
        this.setState({ outputPath: filepath, disable: false });
      } else {
        this.setState({ outputPath: filepath });
      }
      this.setState({ outputPath: filepath, disable: false });
      message.success(`${info.file.name} 路径选择成功.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 路径选择失败.`);
    }
  };

  render() {
    const { data, renderOver, disable,outputPath } = this.state;
    let count = 0;
    for (const item of renderOver) {
      if (item === true) {
        count++;
      }
    }

    return (
      <div className="column">
        <div style={{ width: '100%' }}>
          <Dragger name="file" onChange={this.onXls1Change}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到这里</p>
          </Dragger>
        </div>
        <div style={{ width: '100%' }}>
          <Dragger name="file" onChange={this.onOutputChange} directory>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">选择目标文件夹</p>
          </Dragger>
        </div>
        <div
          className="row"
          style={{ justifyContent: 'space-around', marginTop: '20px' }}
        >
          <Button
            disabled={disable}
            type="primary"
            onClick={() => this.print()}
          >
            生成
          </Button>
          <Progress
            type="circle"
            percent={(count * 100) / (renderOver.length - 1)}
          />
        </div>
        <div style={{ height: 0, overflow: 'hidden' }}>
          {data.map(
            item =>
        (
                <Template key={item.id} item={item} path={outputPath} callback={this.destory} />
              )
          )}
        </div>
      </div>
    );
  }
}
