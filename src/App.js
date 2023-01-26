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
import { VariablesDataStore } from './components/datastore.js';

const VAR_DECORATOR = '@';
const dataStore = new VariablesDataStore();

// Helper
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function QuestionEditor() {
  const editorRef = useRef(null);
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
  const parseVars = () => {
    const contentHtml = editorRef.current.getDoc()
    dataStore.syncInstances(contentHtml);
    dataStore.logVariables();
  }

  const assignIds = () => {
      const editor = editorRef.current
      const domVars = editor.dom.select('span.variable');
      const varIds = [];
      domVars.forEach( v => {
        const id = v.getAttribute('id');
        if(id && !varIds.includes(id)) {
          varIds.push(id);
        } else if (!id || varIds.includes(id)) {
          v.setAttribute('id', '' + varInstanceCount.current++);
        }
      } )
  }

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          height: 500,
          menubar: false,
          browser_spellcheck: true,
          contextmenu: false,
          formats: variableFormat,
          setup: (editor) => {
            // parse variables on every keyboard input
            // wait 500ms for content to finish updating
            editor.on('input', (e) => {
              delay(500).then( () => {
                assignIds()
                parseVars();
                })
            });
          },
          // TODO: Maybe implement this on input listener for more flexibility.
          // For example no need to use delay.
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
      <button onClick={() => console.log(editorRef.current.getContent())}>Log editor content</button>
    </>

  )
}











function App() {


  return (
    <div className="App">
      {/* <SideBar /> */}
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
