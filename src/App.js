import React, { useRef, useState, useEffect } from 'react';

import './index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/sidebar_components';
import { Navbar, NavItem } from './components/navbar_components';
import { QDetails } from './components/qDetails_components';
import { QuestionEditor } from './components/qs_editor_component';
import { Choice } from './components/variable_class.js'
import { VariablesDataStore } from './components/datastore.js';

const VAR_DECORATOR = '@';




function App() {

  const DATA_STORE = new VariablesDataStore();
  const [dataState, setDataState] = useState(0);

  return (
    <div className="App">
      <SideBar />

      <div className='page-content-container'>
        <div className='ques-details'>
          <QDetails />
        </div>
        <div className='tinyEditor'>
          <QuestionEditor
            datastore={DATA_STORE}
            varDecorator={VAR_DECORATOR}
          />
        </div>

      </div>
      <Navbar>
        <NavItem icon='save' />
        <NavItem icon='export' />
      </Navbar>
    </div>
  );
}

export default App;
