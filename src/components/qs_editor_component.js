import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState, useEffect } from 'react';


export function QuestionEditor({datastore: DATASTORE, varDecorator: VAR_DECORATOR}) {
    const editorRef = useRef(null);
    const varInstanceCount = useRef(0);
    const variableFormat = 
    {
      'custom-variable-style': {
        inline: 'button',
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
      DATASTORE.syncInstances(contentHtml);
      DATASTORE.logVariables();
    }
  
    const assignIds = () => {
        const editor = editorRef.current
        const domVars = editor.dom.select('button.variable');
  
        const varIds = [];
        domVars.forEach( v => {
          const id = v.getAttribute('id');
          if(id && !varIds.includes(id)) {
            varIds.push(id);
          } else if (!id || varIds.includes(id)) {
            v.setAttribute('id', '' + varInstanceCount.current++);
            v.setAttribute('tabindex', "-1")
          }
        } )
    }
  
    return (
      <>
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          onInit={(evt, editor) => {
            editorRef.current = editor
            }}
          init={{
            height: 500,
            menubar: false,
            browser_spellcheck: true,
            contextmenu: false,
            formats: variableFormat,
            setup: (editor) => {
              // Dirty event is fired any time editor changes from previous save.
              editor.on('Dirty', (e) => {
                assignIds()
                parseVars();
                editor.save();
                // console.log(editor.getContent());
              });
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
        <button onClick={() => console.log(editorRef.current.getContent())}>Log editor content</button>
      </>
    )
  }
  