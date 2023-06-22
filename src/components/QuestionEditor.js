import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, forwardRef } from 'react';


export default forwardRef(function QuestionEditor(props, ref) {

  const {
    datastore: DATASTORE,
    varDecorator: VAR_DECORATOR,
    handleDataChange: handleDataChange,
  } = props


  const editorRef = ref;
  const varInstanceCount = useRef(0);
  const varIdCount = useRef(0);

  console.log("rerendered")

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
        'class': 'variable',
        'contenteditable': 'false',
      }
    }
  }

  // check all vars and update internal state
  const parseVars = () => {
    const contentHtml = editorRef.current.getDoc()
    DATASTORE.syncInstances(contentHtml);
    handleDataChange();
  }

  const getVarId = (varTitle) => {
    const variable = DATASTORE.getVariable(varTitle)
    let output = -1
    if (variable) {
      output = variable.id
    } else {
      output = varIdCount.current++
    }
    return output
  }

  const assignIds = () => {
    const editor = editorRef.current
    const domVars = editor.dom.select('span.variable');

    // holds ids for this parse.
    const instanceIds = [];
    domVars.forEach(v => {
      v.innerHTML = v.innerHTML.trim()
      // Setting varId
      v.setAttribute('varId', '' + getVarId(v.innerHTML))

      // Setting instanceId
      const instanceId = v.getAttribute('instanceId');
      if (instanceId && !instanceIds.includes(instanceId)) {
        instanceIds.push(instanceId);
      } else if (!instanceId || instanceIds.includes(instanceId)) {
        v.setAttribute('id', '' + varInstanceCount.current++);
        v.setAttribute('tabindex', "-1")
      }
    })
  }

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
        onInit={(evt, editor) => {
          editorRef.current = editor
        }}
        init={{
          height: 300,
          menubar: false,
          browser_spellcheck: true,
          contextmenu: false,
          formats: variableFormat,
          extended_valid_elements: 'span[id|style|class|instanceId|varId]',
          setup: (editor) => {

            // Fired to sync instances to datasore
            editor.addCommand('renameInstances', (ui, value) => {
              console.log(`renaming variable ${value}`)
              const variable = DATASTORE.getVariableById(value)
              variable.instances.forEach(instanceId => {
                editorRef.current.getDoc().getElementById('' + instanceId).innerHTML = variable.title
              })
            })

            // Dirty event is fired any time editor changes from previous save.
            editor.on('Dirty', (e) => {
              assignIds();
              parseVars();
              editor.save();
            });
          },
          text_patterns: [
            { start: VAR_DECORATOR, end: VAR_DECORATOR, format: 'custom-variable-style'},
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
      <button onClick={() => console.log(editorRef.current.getContent({format: "raw"}))}>Log editor content</button>
    </>
  )
})