import * as React from 'react';
import {EffectPanel} from './effect/effectPanel';
import {OscClient} from "./osc/oscClient";

export class App extends React.Component < undefined,
undefined > {

  oscClient: OscClient;

  constructor() {
    super();
  }

  componentWillMount() {
    this.oscClient = new OscClient();
    console.log(this.oscClient);
  }

  render() {
    console.log(this.oscClient);
    return (
      <div>
        <EffectPanel oscClient={this.oscClient} />
      </div>
    );
  }
}
