import * as React from 'react';
import Template from './template';

interface State {
  data: number[];
}

export class App extends React.Component<undefined, State> {
  state = {
    data: []
  };
  print() {
    this.setState({ data: [] }, () => this.setState({ data: [1, 2, 3] }));
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <button onClick={() => this.print()}>print</button>
        <div style={{ height: '10px', overflow: 'hidden' }}>
          {data.map(item => (
            <Template item={item} />
          ))}
        </div>
      </>
    );
  }
}
