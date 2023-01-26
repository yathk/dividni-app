import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { parse, v4 as uuidv4 } from 'uuid';

import './index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/sidebar_components';
import { Navbar, NavItem } from './components/navbar_components';
import { QDetails } from './components/qDetails_components';
import { Choice } from './components/variable_class.js'

const VAR_DECORATOR = '@';
const SAVED_VARIABLES = [];

SAVED_VARIABLES.push(new Choice('myFirstVariable'))


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function QuestionEditor({ initialValue }) {

  const [value, setValue] = useState(initialValue ?? '');
  useEffect(() => setValue(initialValue ?? ''), [initialValue]);

  const varInstanceCount = useRef(0);
  const variableFormat = 
  {
    'custom-variable-style': {
      inline: 'span',
      wrapper: true,
      styles: {
        'color': '#c2c2c2',
        'font-weight': 'bold'
      },
      attributes: {
        'class': 'variable',
        'contenteditable': 'false',
      }
    }
  }

  // check all vars and update internal state
  const parseVars = (contentHtml) => {
    SAVED_VARIABLES.forEach((sv) => {
      sv.instances.forEach((inst) => {
        // remove instance if deleted from editor, 
        if (!contentHtml.body.getElementById('' + inst)) {
          sv.removeInstance(inst)
        }
      })
    })
    
    const variablesHtml = Array.from(contentHtml.body.getElementsByClassName('variable'));
    
    variablesHtml.forEach((varHtml) => {
      const varId = varHtml.getAttribute('id');

      let isFoundSavedVariable = false;

      // add new instance if variable saved
      for (let savedVar of SAVED_VARIABLES) {
        if (savedVar.title === varHtml.innerText) {
          savedVar.addInstance(parseInt(varId));
          isFoundSavedVariable = true;
          break;
        }
      }

      // if not create new variable
      if ( !isFoundSavedVariable ) {
        const newVar = new Choice(varHtml.innerText)
        newVar.addInstance(parseInt(varId));
        SAVED_VARIABLES.push(newVar)
      }
    });
    console.log(SAVED_VARIABLES);
  }

  const assignIds = (editor) => {
      const domVars = editor.dom.select('span.variable');
      const varIds = [];
      domVars.forEach( (v) => {
        const id = v.getAttribute('id');
        if(id && !varIds.includes(id)) {
          varIds.push(id);
        }
        if (!id || varIds.includes(id))
          v.setAttribute('id', '' + varInstanceCount.current++);
      } )
  }

  return (
    <>
      <Editor
        initialValue={initialValue}
        value={value}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
        }}

        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        init={{
          height: 500,
          menubar: false,
          browser_spellcheck: true,
          contextmenu: false,
          formats: variableFormat,
          setup: (editor) => {

            // parse variables on every keyboard input
            editor.on('input', (e) => {
              delay(500).then( () => {
                assignIds(editor)
                parseVars(editor.getDoc());
                } )
            });

            // parse on text pattern match
            editor.on('FormatApply', (e) => {
              if (e.format === 'custom-variable-style') {
                
                // parseVars(editorContent.current);
              }
            })

          },
          text_patterns: [
            { start: VAR_DECORATOR, end: VAR_DECORATOR, format: 'custom-variable-style' },
          ],
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | fontsize | ' +
            'bold italic underline forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14pt }'
        }}
      />
      <button onClick={() => console.log(value)}>Log editor content</button>
    </>

  )
}











function App() {


  return (
    <div className="App">
      <SideBar />
      <Navbar>
        <NavItem icon='save' />
        <NavItem icon='export' />
      </Navbar>
      <div className='page-content-container'>
        <div className='ques-details'>
          <QDetails />
        </div>

        <div className='tinyEditor'>
          <QuestionEditor
            initalValue='hello'
          />
        </div>

      </div>
    </div>
  );
}

export default App;
