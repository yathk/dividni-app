import { Stack, TextField, Typography, Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

interface QDetailsProps {
  title: string
  setTitle: Dispatch<SetStateAction<string>>
  isPreviewOpen: boolean
  setIsPreviewOpen: Dispatch<SetStateAction<boolean>>

}

export default function QDetails({ title, setTitle, setIsPreviewOpen }: QDetailsProps) {

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  }

  const handlePreviewClick = () => {
    setIsPreviewOpen(true)
  }

  return (
    <Stack
      flexDirection={'row'}
    >
      <Stack
        flexDirection={'row'}
        alignItems={'center'}
        width={'100%'}
      >
        <Typography
          variant='h2'
          sx={{ color: 'white' }}
          mr={2}
        >
          Title:
        </Typography>
        <TextField
          fullWidth
          id="ques-title"
          size='small'
          hiddenLabel
          color='white'
          variant='outlined'
          sx={{
            "& .MuiOutlinedInput-root": {
              background: "white",
              borderRadius: '10px'
            }
          }}
          value={title}
          onChange={handleTitleChange}
        />

        <Button 
          variant="contained" 
          color="white"
          sx={{
            ml: '200px',
            px: '40px'
          }}
          onClick={handlePreviewClick}
        >
          Preview
        </Button>

      </Stack>
    </Stack>
  )
}