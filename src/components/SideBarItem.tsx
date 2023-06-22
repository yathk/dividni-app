import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import SettingsDialog from './varSettings/SettingsDialog'
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Button } from 'react-bootstrap';

interface SideBarItemProps {
  id: number,
  name: string,
}

function SideBarItem({ id, name,
}: SideBarItemProps) {

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsDialogOpen(true)
  }

  return (
    <>
      <SettingsDialog
        varId={id}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
      />
      <div
        className='sidebar-item'
        onClick={handleOpen}
      >
        <span
          id={"" + id}
          className='var-name'
        >
          {name}
        </span>
        {/* <FontAwesomeIcon
          // onClick={() => setVarIdBeingChanged(id)}
          className='var-config-icon'
          icon={solid('gear')}
        /> */}
      </div>
    </>
  )
}

export default SideBarItem;