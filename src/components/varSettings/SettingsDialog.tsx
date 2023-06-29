import React, { useContext, Dispatch, SetStateAction, useState, useEffect, ChangeEvent } from 'react'

import { DataStoreContext } from '../../App'
import { Button, Dialog, DialogActions, DialogContent, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


import tinymce from 'tinymce'
import { Variable } from '../../model/Variable';


export interface SettingsProps {
  varId: number,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
  handleClose: () => void
  variable: Variable
}

type ChoiceField = {
  value: string,
  errText: string
}

export default function SettingsDialog({ varId, open, setOpen, variable, handleClose }: SettingsProps) {

  const [title, setTitle] = useState("")
  const [titleErr, setTitleErr] = useState("")
  const [type, setType] = useState('choice')

  const { DATA_STORE, editorIds, dataDirty, setDataDirty, } = useContext(DataStoreContext);

  // Choice states
  const [choices, setChoices] = useState<ChoiceField[]>(variable!.getChoices().map((c: string) => ({
    value: c,
    errText: ""
  })))

  // Random states
  const [min, setMin] = useState("0")
  const [max, setMax] = useState("10")
  const [multiplier, setMultiplier] = useState("1")
  const [randomErrText, setRandErrText] = useState("")

  // Reset to saved state on each reopen
  useEffect(() => {
    setTitle(variable!.title)
    setType(variable!.type)
    setChoices(variable!.getChoices().map((c: string) => ({
      value: c,
      errText: ""
    })))
    setMin("" + variable!.min)
    setMax("" + variable!.max)
    setMultiplier("" + variable!.multiplier)
  }, [open])

  const intTestRegex = /^-?\d*$/

  const handleAddChoice = () => {
    choices.push({
      value: "",
      errText: ""
    })
    setChoices([...choices])
  }

  const handleRemoveChoice = (index: number) => {
    choices.splice(index, 1)
    setChoices([...choices])
  }

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setType(e.target.value)
  }

  // Add validation
  const handleChoiceChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    choices[index].value = e.target.value
    setChoices([...choices])
  }

  const handleMinChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if (intTestRegex.test(value)) {
      setMin(value)

      const parsedValue = parseInt(value)

      if (value.length === 0) {
        setRandErrText("Minimum can't be empty.")
      } else if (parsedValue > parseInt(max)) {
        setRandErrText("Minimum can't be greater than maximum.")
      } else {
        setRandErrText('')
      }

    }
  }

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if (intTestRegex.test(value)) {
      setMax(value)

      if (value.length === 0) {
        setRandErrText("Maximum can't be empty.")
      } else {
        setRandErrText("")
      }
    }

  }

  const handleMultiplierChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    if (intTestRegex.test(value)) {
      setMultiplier(value)

      if (value.length === 0) {
        setRandErrText("Maximum can't be empty.")
      } else {
        setRandErrText("")
      }

    }
  }

  const handleTitleRename = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setTitle(value)
    const existingNames: string[] = DATA_STORE.getAllVariables().map((v: Variable) => v.title)
    if (!value === variable!.title && existingNames.includes(value)) {
      setTitleErr("variable! names must be unique.")
    } else {
      setTitleErr("")
    }
  }

  const handleSave = () => {
    if (title && !titleErr && !randomErrText) {
      variable!.title = title
      variable!.min = parseInt(min)
      variable!.max = parseInt(max)
      variable!.multiplier = parseInt(multiplier)

      variable!.changeType(type)

      // Remove empty choices
      variable!.choices = choices.filter(c => !!c.value).map(c => c.value)

      editorIds.current.forEach((id: string) => {
        const editor = tinymce.get(id)
        if (editor) {
          editor.execCommand('renameInstances', false, variable!.id)
          editor.execCommand('changeVarColour', false, variable!.id)
        }
      });

      setDataDirty(true)
      setOpen(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={"sm"}
      PaperProps={{
        sx: {
          p: 2
        }
      }}
    >
      <DialogContent>
        <TextField
          size='small'
          id="var-name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(e) => handleTitleRename(e)}
          value={title}
          helperText={titleErr || " "}
          error={!!titleErr}
        />

        <TextField
          size='small'
          id="var-type"
          select
          fullWidth
          label="Type"
          defaultValue="choice"
          sx={{ mb: 3 }}
          value={type}
          onChange={handleTypeChange}
        >
          <MenuItem value={'choice'}>
            Choice
          </MenuItem>

          <MenuItem value={'random'}>
            Random
          </MenuItem>
        </TextField>

        {
          varId && type === 'choice'
            ?
            <>
              <Typography fontWeight={500}>Choices:</Typography>
              {
                choices.map((choice: any, index: number) => (
                  <Stack
                    key={index}
                    flexDirection='row'
                    gap={3}
                    alignItems={'center'}
                  >
                    <Typography>{index}:</Typography>
                    <TextField
                      size='small'
                      hiddenLabel
                      fullWidth
                      margin="dense"
                      type="text"
                      variant="outlined"
                      onChange={(e) => handleChoiceChange(e, index)}
                      value={choice.value}
                      helperText={choice.errText}
                      error={!!choice.errText}
                    />
                    <IconButton
                      color='primary'
                      onClick={() => handleRemoveChoice(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                ))
              }
              <Button
                variant='text'
                onClick={handleAddChoice}
              >
                Add more
              </Button>

            </>
            :

            <>
              <Stack
                justifyContent={'center'}
                flexDirection={'row'}
                gap={2}
              >
                <Stack
                  flexDirection='row'
                  gap={1}
                  alignItems={'center'}
                >
                  <Typography>Minimum:</Typography>
                  <TextField
                    size='small'
                    hiddenLabel
                    margin="dense"
                    type="text"
                    variant="outlined"
                    onChange={handleMinChange}
                    value={min}
                    sx={{ width: 50 }}
                  />
                </Stack>

                <Stack
                  flexDirection='row'
                  gap={1}
                  alignItems={'center'}
                >
                  <Typography>Maximum:</Typography>
                  <TextField
                    size='small'
                    hiddenLabel
                    margin="dense"
                    type="text"
                    variant="outlined"
                    onChange={handleMaxChange}
                    value={max}
                    sx={{ width: 50 }}
                  />
                </Stack>

                <Stack
                  flexDirection='row'
                  gap={1}
                  alignItems={'center'}
                >
                  <Typography>Multiplier:</Typography>
                  <TextField
                    size='small'
                    hiddenLabel
                    margin="dense"
                    type="text"
                    variant="outlined"
                    onChange={handleMultiplierChange}
                    value={multiplier}
                    sx={{ width: 50 }}
                  />
                </Stack>
              </Stack>
              <Typography 
                variant='subtitle2' 
                sx={{ color: 'red' }}
                mt={3}
                >
                  {randomErrText || "   "}
                </Typography>
            </>


        }
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
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
