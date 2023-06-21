import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material'

export default function ChoiceSettings({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={() => {}} fullWidth>
      <DialogTitle>Choice Variable Settings</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
