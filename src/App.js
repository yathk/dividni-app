import React, { useRef, useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './CSS/index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/sidebar_components';
import { Navbar, NavItem } from './components/navbar_components';
import { QDetails } from './components/qDetails_components';
import { questionEditor as QuestionEditor } from './components/qs_editor_component';
import { Choice } from './components/variable_class.js'
import { VariablesDataStore } from './components/datastore.js';

const VAR_DECORATOR = '@';
const DATA_STORE = new VariablesDataStore();
DATA_STORE.addVariable(new Choice('my variable'))
DATA_STORE.addVariable(new Choice('name'))


function App() {
  const [dataDirty, setDataDirty] = useState(true);

  return (
    
    <div className="App">
      <header>
        <Navbar>
        </Navbar>
      </header>
      <main>
        <div className='page-content-container'>
          <SideBar
            datastore={DATA_STORE}
            handleDataUpdated={() => setDataDirty(false)}
            handleDataChange={() => setDataDirty(true)}
          />
          <div className='ques-details'>
            <QDetails />
          </div>
          <div className='tinyEditor'>
            <QuestionEditor
              datastore={DATA_STORE}
              varDecorator={VAR_DECORATOR}
              handleDataChange={() => setDataDirty(true)}
            />
          </div>

        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
