import React, { useState, createContext, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import './CSS/index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/Sidebar';
import Navbar from './components/Navbar';
import QDetails from './components/QDetails';
import TinyEditor from './components/TinyEditor';
import { Choice } from './model/Variable.js'
import { VariablesDataStore } from './model/DataStore.js';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Typography from '@mui/material/Typography'
import McqAnswer from './components/McqAnswer';


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
  const editorIds = useRef(['qEditor', 'answer1']);

  return (
    <div className="App">
      <DataStoreContext.Provider value={{ DATA_STORE, setDataStore, dataDirty, setDataDirty, editorIds }}>
        <ThemeProvider theme={theme}>
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

              <Typography variant="h2" mb={3}>Question:</Typography>

              <div className='tinyEditor'>
                <TinyEditor
                  idName="qEditor"
                  datastore={DATA_STORE}
                  varDecorator={VAR_DECORATOR}
                  handleDataChange={() => setDataDirty(true)}
                />
              </div>

              <Typography variant="h2" mt={4} mb={3}>Answers:</Typography>

              <div className='answers'>
                <McqAnswer
                  index="1"
                  VAR_DECORATOR={VAR_DECORATOR}
                  setDataDirty={setDataDirty}
                />
              </div>

            </div>
          </main>
          <footer>
          </footer>
        </ThemeProvider>
      </DataStoreContext.Provider>
    </div >
  );
}

export default App;
