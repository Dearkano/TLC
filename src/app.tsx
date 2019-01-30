import * as React from 'react';
import Operation from './Pages/Operation';

interface Props {}
interface State {}

export class App extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Operation />
      </>
    );
  }
}
