import * as React from 'react';
import { Upload, Icon, message, Button, Progress, Divider } from 'antd';
import RecipeTemplate from './recipeTemplate';
import ReportTemplate from './reportTemplate';
import { readBase, readInitData, readAddition } from '../Utils/xlsx';
import { IData } from '@tlc';
const Dragger = Upload.Dragger;

interface Props { }
interface State {
  data: IData[];
  renderOver: boolean[];
  filepath1: string;
  filepath2: string;
  filepath3: string;
  disable: boolean;
  outputPath: string;
  imagesPath: string;
  current: number;
  mode: 'preview' | 'production';
}

export default class extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      renderOver: [],
      filepath1: './input/init.xls',
      filepath2: './input/base.xls',
      filepath3: './input/addition.xlsx',
      imagesPath: './input/images',
      outputPath: './output',
      // filepath1: '',
      // filepath2: '',
      // filepath3: '',
      // imagesPath: '',
      // outputPath: '',
      disable: false,
      mode: 'production',
      current: 0
    };
  }
  componentDidMount() {
    if (this.state.mode === 'preview') {
      const data: IData[] = [];
      const init = readInitData(this.state.filepath1);
      const base = readBase(this.state.filepath2);
      const addition = readAddition(this.state.filepath3);
      for (const i of init) {
        for (const j of base) {
          if (i.name === j.name) {
            for (const k of addition) {
              if (j.name === k.name) {
                //data[i.id] = { init: i, base: j, addition: k };
                data.push({ init: i, base: j, addition: k })
                break;
              }
            }
          }
        }
      }
      this.setState({ data });
    }
  }
  print() {
    const { filepath1, filepath2, filepath3 } = this.state;
    this.setState({ disable: true });
    if (!filepath1) {
      message.error('请输入文件后再生成报告');
      return;
    }
    const data: IData[] = [];
    const init = readInitData(filepath1);
    const base = readBase(filepath2);
    const addition = readAddition(filepath3);
    console.log(init)
    console.log(base)
    console.log(addition)
    for (const i of init) {
      for (const j of base) {
        if (i.name === j.name) {
          for (const k of addition) {
            if (j.name === k.name) {
              //data[i.id] = { init: i, base: j, addition: k };
              data.push({ init: i, base: j, addition: k })
              break;
            }
          }
        }
      }
    }
    console.log(data)
    const renderOver: boolean[] = [];
    for (const i in init) {
      renderOver[i] = false;
    }
    this.setState({ data: [], renderOver: [] }, () =>
      this.setState({ data, renderOver, disable: false, current: 0 })
    );
  }

  destory = (id: number) => {
    const renderOver = this.state.renderOver;
    renderOver[id] = true;
    this.setState({ renderOver, current: this.state.current + 1 });
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
        this.setState({ filepath1: filepath });

        message.success(`${info.file.name} 文件上传成功.`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };
  onXls2Change = (info: any) => {
    const filepath = info.file.originFileObj.path;
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      if (filepath.indexOf('xls') === -1) {
        message.error(`${info.file.name} 文件格式错误.`);
      } else {
        this.setState({ filepath2: filepath });

        message.success(`${info.file.name} 文件上传成功.`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  onXls3Change = (info: any) => {
    const filepath = info.file.originFileObj.path;
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      if (filepath.indexOf('xls') === -1) {
        message.error(`${info.file.name} 文件格式错误.`);
      } else {
        this.setState({ filepath3: filepath });

        message.success(`${info.file.name} 文件上传成功.`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  onImagesChange = (info: any) => {
    const filepath = info.file.originFileObj.path;
    console.log(info);
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      this.setState({ imagesPath: filepath });

      message.success(`${info.file.name} 路径选择成功.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 路径选择失败.`);
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
      this.setState({ outputPath: filepath });
      message.success(`${info.file.name} 路径选择成功.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} 路径选择失败.`);
    }
  };

  render() {
    const {
      data,
      renderOver,
      disable,
      outputPath,
      mode,
      filepath1,
      filepath2,
      filepath3,
      imagesPath,
      current
    } = this.state;
    let count = 0;
    for (const item of renderOver) {
      if (item === true) {
        count++;
      }
    }
    const progress =
      renderOver.length === 0 ? 0 : (count * 100) / (renderOver.length - 1);
    let btn = false;
    if (
      filepath1 &&
      filepath2 &&
      filepath3 &&
      outputPath &&
      imagesPath &&
      !disable
    ) {
      btn = true;
    }
    return (
      <div className="column" style={{ marginTop: '30px' }}>
        {mode === 'preview' && (
          <>
            <div className="dragger">
              <Button
                style={{ marginBottom: '1rem', marginTop: '1rem' }}
                type="primary"
                onClick={() =>
                  this.setState({
                    mode: 'production',
                    data: []
                  })
                }
              >
                切换到输出模式
              </Button>
            </div>
            {data.length !== 0 && (
              <>
                <RecipeTemplate
                  key={data[0].init.id}
                  item={data[0]}
                  outputPath={outputPath}
                  imagesPath={imagesPath}
                  callback={this.destory}
                />
                {/* <ReportTemplate
                  key={data[0].init.id}
                  item={data[0]}
                  outputPath={outputPath}
                  imagesPath={imagesPath}
                  callback={this.destory}
                /> */}
              </>
            )}
          </>
        )}

        {mode === 'production' && (
          <>
            <div className="row">
              <div className="dragger">
                <Dragger name="file" onChange={this.onXls1Change}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">输入初始数据</p>
                </Dragger>
              </div>
              <div className="dragger">
                <Dragger name="file" onChange={this.onXls2Change}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">输入基线问卷</p>
                </Dragger>
              </div>
              <div className="dragger">
                <Dragger name="file" onChange={this.onXls3Change}>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">输入营养师数据</p>
                </Dragger>
              </div>
              <div className="dragger">
                <Dragger name="file" onChange={this.onImagesChange} directory>
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">选择图片文件夹</p>
                </Dragger>
              </div>
            </div>

            <div className="row" style={{ marginTop: '50px' }}>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <div className="dragger">
                  <Dragger name="file" onChange={this.onOutputChange} directory>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">选择目标文件夹</p>
                  </Dragger>
                </div>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Progress type="circle" percent={progress} />
              </div>
            </div>
            <div
              className="row"
              style={{ marginTop: '20px', justifyContent: 'center' }}
            >
              <Button
                disabled={!btn}
                type="primary"
                onClick={() => this.print()}
                style={{ marginRight: '50px' }}
              >
                生成
              </Button>
              <Button
                style={{ marginBottom: '1rem', marginTop: '1rem' }}
                type="primary"
                onClick={() =>
                  this.setState({
                    mode: 'preview',
                    data: []
                  })
                }
              >
                预览
              </Button>
            </div>
            <Divider />

            <div style={{}}>
              {/* {data.map(item => (
                <RecipeTemplate
                  key={item.init.id}
                  item={item}
                  outputPath={outputPath}
                  imagesPath={imagesPath}
                  callback={this.destory}
                />
              ))}
              {data.map(item => (
                <ReportTemplate
                  key={item.init.id}
                  item={item}
                  outputPath={outputPath}
                  imagesPath={imagesPath}
                  callback={this.destory}
                />
              ))} */}
              <>
                {data[current] &&
                  <RecipeTemplate
                    key={data[current].init.id}
                    item={data[current]}
                    outputPath={outputPath}
                    imagesPath={imagesPath}
                    callback={this.destory}
                  />}
              </>
            </div>
          </>
        )}
      </div>
    );
  }
}
