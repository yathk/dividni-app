import { useContext, useEffect, useState } from 'react';
import tinymce from 'tinymce/tinymce';

import SettingsDialog from './varSettings/SettingsDialog'
import { Dialog, DialogTitle, DialogContent, Button, TextField, DialogActions, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DataStoreContext } from '../App';

import CircleIcon from '@mui/icons-material/Circle';


interface SideBarItemProps {
  id: number,
  name: string,
}

function SideBarItem({ id, name,
}: SideBarItemProps) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { DATA_STORE, setDataStore, editorIds } = useContext(DataStoreContext);

  const variable = DATA_STORE.getVariableById(id)

  const handleDelete = () => {
    editorIds.current.forEach((editorId: string) => {
      const editor = tinymce.get(editorId);
      if (editor) {
        editor.execCommand('removeInstances', false, id)
      }
    })
    DATA_STORE.removeVariable(name);
    setDataStore({...DATA_STORE})
    setIsConfirmOpen(false);
  }
  
  const handleClose = () => {
    setIsDialogOpen(false)
  }

  return (
    variable && variable.title ? <>
      <SettingsDialog
        varId={id}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        handleClose={handleClose}
        variable={variable}
      />

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        fullWidth
        maxWidth={"sm"}
        PaperProps={{
          sx: {
            p: 2
          }
        }}
      >
        <DialogTitle>Remove "{name}"?</DialogTitle>
        <DialogContent>
          <Typography fontWeight={500}>This will remove all mentions of the variable from the question editor.</Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setIsConfirmOpen(false)}
            variant='text'
            color='error'
          >
            No
          </Button>
          <Button
            variant='text'
            onClick={handleDelete}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>



      <div
        className='sidebar-item'
      >
        <CircleIcon 
          sx={{
            color: variable.colour,
            fontSize: '12px',
            mr: '10px'
          }} 
        />
        <Box
          height={'100%'}
          py={3}
          onClick={() => setIsDialogOpen(true)}
        >
          <Typography
            id={"" + id}
            className='var-name'
            textAlign={'center'}
          >
            {name} ({variable.instances.length})
          </Typography>
        </Box>
        <IconButton
          color='white'
          sx={{
            mr: 3,
            color: "white"
          }}
          onClick={() => setIsConfirmOpen(true)}
        >
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>

      </div>

    </>
    :
    null
  )
}

export default SideBarItem;