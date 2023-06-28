import BundledEditor from '../BundledEditor';
import React, { useRef, useContext } from 'react';
import { AlertContext, DataStoreContext } from '../App';

let varInstanceCount = 1;
let varIdCount = 0;

// helper for decoding html
function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function TinyEditor(props) {

  const {
    datastore: DATASTORE,
    varDecorator: VAR_DECORATOR,
    handleDataChange: handleDataChange,
    idName
  } = props

  const { DATA_STORE } = useContext(DataStoreContext)
  const { setAlertText } = useContext(AlertContext)

  const editorRef = useRef(null);

  const variableFormat = {
    'custom-variable-style': {
      inline: 'span',
      wrapper: true,
      styles: {
        'color': '#c2c2c2',
        'font-weight': 'bold',
        'border': '1px solid #c2c2c2'
      },
      attributes: {
        'class': 'variable mceNonEditable',
        'contenteditable': 'false',
      }
    }
  }

  // check all vars and update internal state
  const parseVars = () => {
    const contentHtml = editorRef.current.getDoc()
    DATA_STORE.syncInstances(contentHtml);
    handleDataChange();
  }

  const getVarId = (varTitle) => {
    const variable = DATA_STORE.getVariable(varTitle)
    let output = -1
    if (variable) {
      output = variable.id
    } else {
      output = varIdCount++
    }
    return output
  }

  const assignIds = () => {
    const editor = editorRef.current
    let content = editor.getContent({ format: "raw" })

    // Look for variables enclosed in @
    const matchedText = content.match(/@([^@]*)@&nbsp;/)

    if (matchedText) {
      // Get entered var name
      const varName = decodeHtml(matchedText[0].replaceAll('@', '')).trim()

      // Don't allow if var name empty
      if (!varName || varName === " ") {
        setAlertText("Variable names can't be a space!")
        return
      }
      setAlertText("")

      // Replace entered text with span marking variable
      content = content.replace(/@([^@]*)@&nbsp;/, `
      <span
        style="color: #c2c2c2; font-weight: bold; border: 1px solid #c2c2c2"
        class="variable mceNonEditable"
        contenteditable="false"
      >
      ${varName.trim()}
      </span>&nbsp;<span id="cursor-marker"></span>
      `)


      editor.setContent(content)
      const markerEl = editor.getDoc().getElementById('cursor-marker')
      editor.selection.select(markerEl)
      editor.selection.collapse(false)
      markerEl.remove()
    }


    const domVars = editor.dom.select('span.variable');

    // holds ids for this parse.
    domVars.forEach(v => {
      v.innerHTML = v.innerHTML.trim()
      // Setting varId
      v.setAttribute('varId', '' + getVarId(v.innerHTML))

      // Setting instanceId
      const instanceId = v.getAttribute('id');
      if (!instanceId) {
        v.setAttribute('id', `instance${varInstanceCount++}`);
        v.setAttribute('tabindex', "-1")
      }
    })
  }

  return (
    <>
      <BundledEditor
        id={idName}
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => {
          editorRef.current = editor
        }}
        init={{
          inline: true,
          menubar: false,
          browser_spellcheck: true,
          contextmenu: false,
          formats: variableFormat,
          extended_valid_elements: 'span[id|style|class|instanceId|varId]',
          setup: (editor) => {

            // Renames all instances of a variable
            editor.addCommand('renameInstances', (ui, value) => {
              console.log(`renaming variable ${value}`)
              const variable = DATA_STORE.getVariableById(value)
              variable.instances.forEach(instanceId => {
                const el = editorRef.current.getDoc().getElementById(instanceId)
                el.innerHTML = variable.title
              })
            })

            // Removes all instances of a variable
            editor.addCommand('removeInstances', (ui, value) => {
              const variable = DATA_STORE.getVariableById(value)
              variable.instances.forEach(instanceId => {
                editorRef.current.getDoc().getElementById('' + instanceId).remove()
              })
            })

            // Dirty event is fired any time editor changes from previous save.
            editor.on('Dirty', (ev) => {
              assignIds();
              parseVars();
              editor.save();
            });
          },
          // text_patterns: [
          //   { start: VAR_DECORATOR, end: VAR_DECORATOR, format: 'custom-variable-style'},
          // ],
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'wordcount'
          ],
          toolbar: 'undo redo | fontsize | ' +
            'bold italic underline forecolor | alignleft aligncenter ' +
            'alignright | bullist numlist outdent indent | ' +
            'removeformat',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14pt }'
        }}

      />
      <button onClick={() => console.log(editorRef.current.getContent({ format: "raw" }))}>Log editor content</button>
    </>
  )
}