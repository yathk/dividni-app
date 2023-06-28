import BundledEditor from '../BundledEditor';
import React, { useRef, useContext } from 'react';
import { AlertContext, DataStoreContext, VAR_DECORATOR} from '../App';
import { CHOICE_COLOUR, Variable } from '../model/Variable';

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
    handleDataChange: handleDataChange,
    idName
  } = props

  const { DATA_STORE } = useContext(DataStoreContext)
  const { setAlertText } = useContext(AlertContext)

  const editorRef = useRef(null);

  // check all vars and update datastore
  const parseVars = () => {
    const contentHtml = editorRef.current.getDoc()
    DATA_STORE.syncInstances(contentHtml);
    handleDataChange();
  }

  // Helper for getting id of exisitng vars
  const getVarId = (varTitle) => {
    const variable = DATA_STORE.getVariable(varTitle)
    let output = -1
    if (variable) {
      output = variable.id
    } else {
      const newVar = new Variable(varTitle, ++varIdCount, 'choice')
      DATA_STORE.addVariable(newVar)
      output = varIdCount
    }
    return output
  }

  // Wraps each var entered in a span with unique id
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

      const varId = getVarId(varName)
      const variable = DATA_STORE.getVariableById(varId)
      const colour = variable ? variable.colour : CHOICE_COLOUR

      // Replace entered text with span marking variable
      content = content.replace(/@([^@]*)@&nbsp;/, `
      <span
        id=instance${++varInstanceCount}
        style="color: ${colour}; font-weight: bold; border: 1px solid ${colour}; border-radius: 5px; padding: 0 5px;"
        class="variable mceNonEditable"
        contenteditable="false"
      >${varName}</span>&nbsp;<span id="cursor-marker"></span>
      `)

      editor.setContent(content)

      const newVarEl = editor.getDoc().getElementById(`instance${varInstanceCount}`)
      newVarEl.setAttribute('varid', varId)

      const markerEl = editor.getDoc().getElementById('cursor-marker')
      editor.selection.select(markerEl)
      editor.selection.collapse(false)
      markerEl.remove()
    }
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
          extended_valid_elements: 'span[id|style|class|varid]',
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