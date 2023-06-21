import React, { useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './CSS/index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/Sidebar';
import Navbar from './components/Navbar';
import QDetails from './components/QDetails';
import QuestionEditor from './components/QuestionEditor';
import { Choice } from './model/Variable'
import { VariablesDataStore } from './model/DataStore.js';

const VAR_DECORATOR = '@';
const DATA_STORE = new VariablesDataStore();
DATA_STORE.addVariable(new Choice('my variable'))
DATA_STORE.addVariable(new Choice('name'))

export const DataStoreContext = createContext();

function App() {
  const [dataDirty, setDataDirty] = useState(true);

  return (
    <div className="App">
      <DataStoreContext.Provider value={DATA_STORE}>
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
      </DataStoreContext.Provider>
    </div>
  );
}

export default App;
