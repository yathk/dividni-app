import React, { useState, createContext, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';


// import './CSS/index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/Sidebar';
import Navbar from './components/Navbar';
import QDetails from './components/QDetails';
import TinyEditor from './components/TinyEditor';
import { Variable } from './model/Variable.js'
import { VariablesDataStore } from './model/DataStore.js';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

import { Typography, Alert, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';


import McqAnswer from './components/McqAnswer';
import PreviewDialog from './components/PreviewDialog';
import { Button } from '@mui/material';


export const VAR_DECORATOR = '@';

const newDataStore = new VariablesDataStore();


const tempVar = new Variable('my variable', 22, 'choice')
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
  const [alertText, setAlertText] = useState('')
  const [title, setTitle] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleDataChange = () => {
    setDataDirty(true)
  }

  const handleAddAnswer = () => {
    const newId = `answer${answers.length + 1}`
    answers.push({
      id: newId,
      isCorrect: false,
    })
    setAnswers([...answers])
    editorIds.current.push(newId)
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
                >
                  {alertText}
                </Alert>
              </Collapse>
              <div className='page-content-container'>

              <PreviewDialog 
                open={isPreviewOpen}
                setIsOpen={setIsPreviewOpen}
                title={title}
                answers={answers}
              />

                <SideBar
                  datastore={DATA_STORE}
                  handleDataUpdated={() => setDataDirty(false)}
                  handleDataChange={() => setDataDirty(true)}
                />

                <div className='ques-details'>
                  <QDetails
                    {...{title, setTitle, isPreviewOpen, setIsPreviewOpen}}
                    
                  />
                </div>

                <Typography variant="h2" mb={3}>Question:</Typography>

                <div className='tinyEditor'>
                  <TinyEditor
                    idName="qEditor"
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
                        setDataDirty={setDataDirty}
                        handleRemoveAnswer={handleRemoveAnswer}
                        answers={answers}
                        setAnswers={setAnswers}
                      />
                    ))
                  }
                  <Button
                    variant='outlined'
                    color='white'
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
