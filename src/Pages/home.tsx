import * as React from 'react';
import Head from './head';
import Operation from './operation';

interface Props {}
interface State {}
export default class extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Head />
        <Operation />
      </>
    );
  }
}
