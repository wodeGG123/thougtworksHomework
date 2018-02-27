import React, { Component } from 'react';
import './App.scss';
import { Tabs, Tab,} from 'react-bootstrap'
import Agent from './common/agent'
var FA = require('react-fontawesome')

class App extends Component {
  render() {
    return (
      <div className="App">
         <div className="clearfix">
            <div className="top-bar pull-right">
                <span className="member">
                  Signed in as <a href="http://localhost:3000/">Member</a>
                </span>
                <span className="out">
                  <span><FA name="arrow-right" /></span>
                  <a href="http://localhost:3000/">Signed out</a>
                </span>
            </div>
         </div>

         <div className="tab-wrap">
           <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="HELP">
              <div className="no-effects">
                  <p>
                    HELP
                  </p>
              </div>
            </Tab>
            <Tab eventKey={2} title="AGENTS">
              <Agent />
            </Tab>
            <Tab eventKey={3} title="MY CRUISE">
               <div className="no-effects">
                  <p>
                    MY CRUISE
                  </p>
              </div>
            </Tab>
            <Tab eventKey={4} title="DASHBOARD">
            <div className="no-effects">
                  <p>
                  DASHBOARD
                  </p>
              </div>
            </Tab>
           </Tabs>
         </div>
         <div className="app-bottom">
            <p>Copyright: Toughtworks Inc.</p>
         </div>
      </div>
    );
  }
}

export default App;
