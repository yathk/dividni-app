import React, { useState, createContext, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './CSS/index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/Sidebar';
import Navbar from './components/Navbar';
import QDetails from './components/QDetails';
import QuestionEditor from './components/QuestionEditor';
import { Choice } from './model/Variable.js'
import { VariablesDataStore } from './model/DataStore.js';
import { ThemeProvider } from 'react-bootstrap';
import { theme } from './theme';


const VAR_DECORATOR = '@';
const newDataStore = new VariablesDataStore();


const tempVar = new Choice('my variable', 22)
tempVar.addChoice("test1")
tempVar.addChoice("test2")
newDataStore.addVariable(tempVar)

export const DataStoreContext = createContext();

function App() {
  const [dataDirty, setDataDirty] = useState(true);
  const [DATA_STORE, setDataStore] = useState(newDataStore)
  const qEditor = useRef(null);

  return (
    <div className="App">
      <DataStoreContext.Provider value={{ DATA_STORE, setDataStore, dataDirty, setDataDirty, qEditor }}>
        <ThemeProvider value={theme}>
          <header>
            <Navbar />
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
                  ref={qEditor}
                  datastore={DATA_STORE}
                  varDecorator={VAR_DECORATOR}
                  handleDataChange={() => setDataDirty(true)}
                />
              </div>
            </div>
          </main>
          <footer>
          </footer>
        </ThemeProvider>
      </DataStoreContext.Provider>
    </div>
  );
}

export default App;
