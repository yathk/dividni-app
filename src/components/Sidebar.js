import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import SideBarItem from './SideBarItem';

export default function SideBar({
  datastore,
  handleDataUpdated
}) {
  useEffect(() => handleDataUpdated());


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
      <Typography
        variant="h2"
        p={2}
      >
        Variables
      </Typography>
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



