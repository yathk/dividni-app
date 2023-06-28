import React, { useState, createContext, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


// import './CSS/index.css';
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

import { Typography, Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


import McqAnswer from './components/McqAnswer';
import { Button } from '@mui/material';


const VAR_DECORATOR = '@';
const newDataStore = new VariablesDataStore();


const tempVar = new Choice('my variable', 22)
tempVar.addChoice("test1")
tempVar.addChoice("test2")
newDataStore.addVariable(tempVar)

export const DataStoreContext = createContext();
export const AlertContext = createContext();

function App() {
  const [dataDirty, setDataDirty] = useState(true);
  const [DATA_STORE, setDataStore] = useState(newDataStore)
  const editorIds = useRef(['qEditor', 'answer1']);
  const [answers, setAnswers] = useState([{ id: 'answer1', isCorrect: true }])
  const [alertText, setAlertText] = useState(' test error ')

  const handleAddAnswer = () => {
    answers.push({
      id: `answer${answers.length + 1}`,
      isCorrect: false,
    })
    setAnswers([...answers])
  }

  const handleRemoveAnswer = (answerId) => {
    const index = answers.indexOf(answerId)
    answers.splice(index, 1)
    setAnswers([...answers])
  }

  return (
    <div className="App">
      <DataStoreContext.Provider value={{ DATA_STORE, setDataStore, dataDirty, setDataDirty, editorIds }}>
        <AlertContext.Provider value={{ alertText, setAlertText }}>
          <ThemeProvider theme={theme}>
            <main>
              <Navbar />
              <Collapse in={!!alertText} className='alert' >
                <Alert
                  severity="error"

                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setAlertText('');
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                // sx={{
                //   display: alertText ? "flex" : "none"
                // }}
                >
                  {alertText}
                </Alert>
              </Collapse>
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
                  {
                    answers.map((answer, index) => (
                      <McqAnswer
                        key={answer.id}
                        idName={answer.id}
                        index={index}
                        VAR_DECORATOR={VAR_DECORATOR}
                        setDataDirty={setDataDirty}
                        handleRemoveAnswer={handleRemoveAnswer}
                        answers={answers}
                        setAnswers={setAnswers}
                      />
                    ))
                  }
                  <Button
                    variant='text'
                    onClick={handleAddAnswer}
                  >
                    Add answer
                  </Button>
                </div>

              </div>
            </main>
            <footer>
            </footer>
          </ThemeProvider>
        </AlertContext.Provider>
      </DataStoreContext.Provider>
    </div>
  );
}

export default App;
