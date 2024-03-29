import { useEffect, useState } from 'react';
import { Typography, Button, Box, Stack } from '@mui/material';
import SideBarItem from './SideBarItem';
import AddVarDialog from './varSettings/AddVarDialog';

export default function SideBar({
  datastore,
  handleDataUpdated
}) {
  useEffect(() => handleDataUpdated());

  const [dialogOpen, setIsOpen] = useState(false)

  const handleAddVar = () => {
    setIsOpen(true);
  }

  const variables = datastore.getAllVariables();
  const displayList = variables.map((v, index) =>
    <SideBarItem
      key={index}
      name={v.title}
      id={v.id}
    />
  );

  return (
    <div className='sidebar'>

      <AddVarDialog open={dialogOpen} setOpen={setIsOpen} />

      <Typography
        variant="h2"
        p={2}
      >
        Variables
      </Typography>

      <Stack alignItems={'center'}>
        <Button
          variant="outlined"
          color="white"
          sx={{ width: '80%'}}
          onClick={handleAddVar}
        >
          Add variable
        </Button>
      </Stack>

      <div className='sidebar-content'>
        {
          displayList.length > 0 ?
            displayList
            :
            <Typography
              sx={{ fontSize: 14, color: 'white' }}
              textAlign={'center'}
              mt={2}
            >
              No variables to display.
            </Typography>
        }
      </div>
    </div>
  )
}



