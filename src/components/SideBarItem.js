import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import SettingsDialog from './varSettings/SettingsDialog'

function SideBarItem({ id, name,
  setVarIdBeingRenamed,
  varIdBeingRenamed,
  handleVarRenamed,

  handleVarChanged,
  varIdBeingChanged,
  setVarIdBeingChanged
}) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleVarClicked = (e, varId) => {
  // }

  return (
    <div
      className='sidebar-item'
      onClick={() => setIsDialogOpen(true)}
    >
      <SettingsDialog varId={id} open={isDialogOpen} setOpen={setIsDialogOpen}/>
      <span
        id={id}
        className='var-name'
      >
        {name}
      </span>
      <FontAwesomeIcon
        onClick={() => setVarIdBeingChanged(id)}
        className='var-config-icon'
        icon={solid('gear')}
      />
      {/* {isShowSettings && <ChoiceVariableSettings />} */}
    </div>
  )
}

export default SideBarItem;