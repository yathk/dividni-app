import React, { useContext, useState, ChangeEvent, useEffect } from 'react'

import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Typography } from '@mui/material'
import { settingsProps } from './SettingsDialog'
import { Choice, Variable } from '../../model/Variable.js'
import { DataStoreContext } from '../../App'
import { Stack } from 'react-bootstrap'
import CloseIcon from '@mui/icons-material/Close';

interface choiceSettingsProps extends settingsProps {
  variable: Choice
}

export default function ChoiceSettings({ open, setOpen, variable }: choiceSettingsProps) {

  const { dataDirty, setDataDirty, DATA_STORE, qEditor } = useContext(DataStoreContext)

  const [title, setTitle] = useState(variable.title)
  const [titleErr, setTitleErr] = useState("")

  const [choices, setChoices] = useState(variable.getChoices().map((c) => ({
    value: c,
    errText: ""
  })))

  // Reset to saved state on each reopen
  useEffect(() => {
    setTitle(variable.title)
    setTitleErr("")
    setChoices(variable.getChoices().map((c) => ({
      value: c,
      errText: ""
    })))
  }, [open])

  const handleTitleRename = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setTitle(value)
    const existingNames: string[] = DATA_STORE.getAllVariables().map((v: Variable) => v.title)
    if (!value === variable.title && existingNames.includes(value)) {
      setTitleErr("Variable names must be unique.")
    } else {
      setTitleErr("")
    }
  }

  const handleAddVar = () => {
    choices.push({
      value: "",
      errText: ""
    })
    setChoices([...choices])
  }

  const handleRemoveVar = (index: number) => {
    choices.splice(index, 1)
    setChoices([...choices])
  }

  // Add validation
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    choices[index].value = e.target.value
    setChoices([...choices])
  }

  const handleSave = () => {
    variable.title = title
    qEditor.current.execCommand('renameInstances', undefined, variable.id)
    // Remove empty choices
    variable.choices = choices.filter(c => !!c.value).map(c => c.value)
    setDataDirty(true)
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth={"sm"}
      PaperProps={{
        sx: {
          p: 2
        }
      }}
    >
      {/* <DialogTitle>Type</DialogTitle> */}
      <DialogContent>
        <TextField
          // size='small'
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => handleTitleRename(e)}
          value={title}
          helperText={titleErr || " "}
          error={!!titleErr}
        />

        <Typography fontWeight={500} >Choices:</Typography>

        {
          choices.map((choice, index) => (
            <Stack
              key={index}
              direction='horizontal'
              gap={3}
            >
              <Typography>{index}:</Typography>
              <TextField
                size='small'
                hiddenLabel
                fullWidth
                margin="dense"
                type="text"
                variant="outlined"
                onChange={(e) => handleChange(e, index)}
                value={choice.value}
                helperText={choice.errText}
                error={!!choice.errText}
              />
              <IconButton
                color='primary'
                onClick={() => handleRemoveVar(index)}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          ))
        }
        <Button
          variant='text'
          onClick={handleAddVar}
        >
          Add more
        </Button>

      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => setOpen(false)}
          sx={{
            textTransform: 'none'
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          sx={{
            textTransform: 'none'
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
