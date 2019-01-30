import * as React from 'react';
import Template from './template';
import { readFile } from '../Utils/xlsx';
import { ISurvey } from '@tlc';

interface Props {}
interface State {
  data: ISurvey[];
}

export default class extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const data = readFile().slice(1);
    //this.setState({ data });
  }
  print() {
    const data = readFile().slice(1);
    this.setState({ data: [] }, () => this.setState({ data }));
  }

  render() {
    const { data } = this.state;
    console.log(data)
    return (
      <>
        <button onClick={() => this.print()}>print</button>
        <div style={{ height: '0px', overflow: 'hidden' }}>
          {data.map(item => (
            <Template key={item.id} item={item} />
          ))}
        </div>
      </>
    );
  }
}
