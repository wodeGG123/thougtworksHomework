import React, { Component } from 'react';
import './App.scss';

import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <div className="App">
         <div className="clearfix">
            <div className="pull-right">
                <member>
                  Signed in as <a href="#">Member</a>
                </member>
                <out>
                  <a href="#">Signed out</a>
                </out>
            </div>
         </div>

         <div>
         <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Tab 1">
              Tab 1 content
            </Tab>
            <Tab eventKey={2} title="Tab 2">
              Tab 2 content
            </Tab>
          </Tabs>
         </div>
      </div>
    );
  }
}

export default App;
