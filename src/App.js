import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { v4 as uuidv4 } from 'uuid';

import './index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/sidebar_components';
import { Navbar, NavItem } from './components/navbar_components';
import { QDetails } from './components/qDetails_components';
import { Choice } from './components/variable_class.js'

const VAR_DECORATOR = '@';
const SAVED_VARIABLES = [];
const ENTERED_VARIABLES = [];

SAVED_VARIABLES.push(new Choice('myFirstVariable'))



const handleVariableEntered = (enteredVariable) => {
  let found = false;
  for (let var_index in SAVED_VARIABLES) {
    if (SAVED_VARIABLES[var_index].title === enteredVariable.name) {
      console.log('VARIABLE FOUND AT ' + var_index);
      found = true;
      break;
    }
  }
  if (!found) {
    const newVar = new Choice(enteredVariable.name, true);
    newVar.addInstance(parseInt(enteredVariable.instanceId));
    SAVED_VARIABLES.push(newVar);
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}



// const validateVariableName = (varName) => {
//   let output = varName.replaceAll('@', '');
//   output = output.replaceAll(' ', '');
//   return output;
// }


// const validateVariables = (htmlBody) => {
//   console.log(htmlBody.getGetElementsByClassName('variable'))
// }



function QuestionEditor({ initialValue }) {

  const [value, setValue] = useState(initialValue ?? '');
  useEffect(() => setValue(initialValue ?? ''), [initialValue]);

  // const isEnteringVar = useRef(false);
  // const varEntered = useRef('');
  const varInstanceCount = useRef(0);
  const editorContent = useRef('');

  // const getNextInstanceId = () => {
  //   varInstanceCount.current += 1;
  //   return varInstanceCount.current;
  // }

  // check all vars and update internal state
  const parseVars = (contentHtml) => {
    console.log(contentHtml.activeElement)
    const variablesHtml = Array.from(contentHtml.activeElement.getElementsByClassName('variable'));
    SAVED_VARIABLES.forEach((sv) => {
      sv.instances.forEach((inst) => {
        // remove instance if deleted from editor, 
        if (!contentHtml.activeElement.getElementById('' + inst)) {
          sv.removeInstance(inst)
        }
      })
    })
    
    variablesHtml.forEach((varHtml) => {
      if ( !varHtml.getAttribute('id')) {
        // add unique 'id' to span wrapper
        const varId = varInstanceCount.current
        varInstanceCount.current++;
        varHtml.setAttribute('id', varId);
        let isFoundSavedVariable = false;
        // add new instance if variable saved
        for (let savedVar of SAVED_VARIABLES) {
          if (savedVar.title === varHtml.innerText) {
            savedVar.addInstance(varId);
            isFoundSavedVariable = true;
            break;
          }
        }
        // save variable if its new
        if ( !isFoundSavedVariable ) {
          const newVar = new Choice(varHtml.innerText)
          newVar.addInstance(varId);
          SAVED_VARIABLES.push(newVar)
        }
      }
    });

    // console.log(SAVED_VARIABLES);
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
          formats: {
            'custom-variable-style': {
              inline: 'span',
              wrapper: true,
              styles: {
                'color': '#c2c2c2',
                'font-weight': 'bold'
              },
              attributes: {
                // 'id': '' + varInstanceCount.current,
                'class': 'variable',
                'contenteditable': 'false',
              }
            }
          },
          setup: (editor) => {


            // parse variables on every keyboard input
            editor.on('input', (e) => {
              console.log('fired');
              delay(500).then(() => {
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
              })

              editorContent.content = editor.getDoc();
              // parseVars(editorContent.content);
              // editor.setContent()
              // console.log(editorContent.current)
            });

            // parse on text pattern match
            editor.on('FormatApply', (e) => {
              if (e.format === 'custom-variable-style') {
                editorContent.current = editor.getDoc();
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


//HELPER

const highlightVariables = (content) => {
  const regexp = /(?!\\)@[0-9]+/g;
  const matches = [...content.matchAll(regexp)].reverse();
  matches.forEach(match => {
    content = content.replace(match, `<span style='color:red;>${match}</span>`)
  })
  return content;
};







              // console.log(varInstanceCount.count)
              // varInstanceCount.current++;


              // editor.setContent(contentHtml.activeElement.innerHTML)



              //   if (e.data === VAR_DECORATOR) {
              //     if (!isEnteringVar.current) {
              //       isEnteringVar.current = true;
              //     }           
              //   }

              //   if (e.data === ' ') {
              //     const lastLetterI = varEntered.current.length-1;
              //     if (varEntered.current.slice(lastLetterI) === '@') {
              //       isEnteringVar.current = false;
              //     }
              //   }

              //   if (isEnteringVar.current && e.inputType === 'insertText') {
              //       varEntered.current += e.data;
              //   } else if (!isEnteringVar.current && varEntered.current.length > 0) {

              //       const enteredVar = {
              //         'name': validateVariableName(varEntered.current),
              //         'instanceId': '' + varInstanceCount.current
              //         }
              //       handleVariableEntered(enteredVar);

              //       varEntered.current = '';
              //       varInstanceCount.current++;

              //       console.log(SAVED_VARIABLES);
              //   }