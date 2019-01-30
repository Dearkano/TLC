import * as React from 'react';
import Home from './Pages/home'
import Login from './Pages/login';
import global, { GlobalState } from './Containers';
import { Subscribe, Provider } from 'unstated';

export const App: React.SFC = () => (
  <div>
    <Provider>
      <Subscribe to={[global]}>
        {(g: GlobalState) => (
          <div>{true ? <Home /> : <Login />}</div>
        )}
      </Subscribe>
    </Provider>
  </div>
);
