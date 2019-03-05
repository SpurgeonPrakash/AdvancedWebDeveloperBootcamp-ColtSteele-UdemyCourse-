import React, { Component } from 'react';
import LinkGroup from './LinkGroup';

import SwitchBasic from './SwitchBasic';
// import * as pagine from './Pages';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="App">
        <LinkGroup />
        <SwitchBasic/>
      </div>
    );
  }
}

export default App;
