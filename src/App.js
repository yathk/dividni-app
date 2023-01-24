import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import './index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/sidebar_components';
import { Navbar, NavItem } from './components/navbar_components';
import { QDetails } from './components/qDetails_components';

const VAR_DECORATOR = '@';
const ENTERED_VARS = [];


function QuestionEditor(initialValue) {
  
}











function App() {
  const editorRef = useRef(null);
  const [varEntered, setVarEntered] = useState(null);
  const [isEnteringVar, setIsEnteringVar] = useState(false);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
          <>
            <Editor
              tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue='<p>This is the initial content of the editor.</p>'
              init={{
                height: 500,
                menubar: false,
                browser_spellcheck: true,
                contextmenu: false,
                setup: (editor) => {
                  editor.addCommand('makevariable', (ui, v) => {
                    console.log(v);
                  });

                  editor.on('input', (e) => {
                    // console.log(e.data)



                    if (e.data === VAR_DECORATOR) {
                      // console.log(`SETTING isEnteringVar TO ${!isEnteringVar}`)

                      console.log(`STATE is now ${isEnteringVar}`);
                      
                      if (isEnteringVar) {
                        setIsEnteringVar(false);
                      } else {
                        setIsEnteringVar(true);
                      }

                      console.log(`STATE is now ${isEnteringVar}`);


                      // setVarEntered('');

                      // if (!isEnteringVar && varEntered) {
                      //   console.log(`entered variable ${varEntered}`);
                      //   ENTERED_VARS.push(varEntered);
                      //   setVarEntered(null);
                      // } else if (isEnteringVar && varEntered !== null) {
                      //   console.log(`SETTING varEntered TO ${varEntered + e.data}`)
                      //   setVarEntered(varEntered + e.data);
                      // }

                    }

                  });
                },
                // text_patterns: [
                //   {start:VAR_DECORATOR, end:VAR_DECORATOR, cmd: 'makevariable', value: 'hello'}
                // ],
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | fontsize | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
            <button onClick={log}>Log editor content</button>
          </>
        </div>
      </div>
    </div>
  );
}

export default App;


//HELPER

const highlightVariables = (content) => {
  const regexp = /(?!\\)@[0-9]+/g;
  const matches = [...content.matchAll(regexp)].reverse();
  matches.forEach( match => {
    content = content.replace(match, `<span style='color:red;>${match}</span>`)
  })
  return content;
};