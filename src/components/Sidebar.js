import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

import SideBarItem from './SideBarItem';
import ChoiceDialog from './varSettings/SettingsDialog';

export default function SideBar({
  datastore,
  handleDataUpdated,
  handleDataChange
}) {
  useEffect(() => handleDataUpdated());

  const [isAddNewVar, setIsAddNewVar] = useState(false);
  // Holds the current var Id being renamed. 
  // Switches vars name fields to input allowing user to rename. 
  const [varIdBeingChanged, setVarIdBeingChanged] = useState(null);

  // Handler for when var is changed
  const handleVarChanged = (e, varId) => {
    console.log('var changed')
  }

  const variables = datastore.getAllVariables();
  const displayList = variables.map(v =>
    <SideBarItem
      key={v.id}
      name={v.title}
      id={v.id}
    />
  );
  if (isAddNewVar) {
    displayList.push(<SideBarItem key='25' name='hello' />)
  }
  return (
    <div className='sidebar'>
      {/* <SidebarHeader onclick={() => setIsAddNewVar(true)} /> */}
      <div className='sidebar-content'>
        {displayList}
      </div>
    </div>
  )
}

function SidebarHeader(props) {
  return (
    <div className='sidebar-header'>
      <button className='add-var-btn' onClick={() => props.onclick()}>
        <FontAwesomeIcon className='add-var-icon' icon={solid('plus')} size='xl' />
        <span>add new</span>
      </button>
    </div>
  )
}
