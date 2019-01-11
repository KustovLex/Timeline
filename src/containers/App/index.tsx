import * as React from 'react';
import { Header, Timeline } from '../../components';
import './style.css';
import { Provider } from 'mobx-react';
import { ApplicationStore } from '../../stores/applicationStore';

export class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <Provider applicationStore={new ApplicationStore()}>
        <React.Fragment>
            <Header />
            <Timeline />
        </React.Fragment>
        </Provider>
      </div>
    );
  }
}