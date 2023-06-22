import { useEffect, useState } from 'react';


import SideBarItem from './SideBarItem';

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
  const displayList = variables.map((v, index) =>
    <SideBarItem
      key={index}
      name={v.title}
      id={v.id}
    />
  );

  return (
    <div className='sidebar'>
      {/* <SidebarHeader onclick={() => setIsAddNewVar(true)} /> */}
      <div className='sidebar-content'>
        {displayList}
      </div>
    </div>
  )
}



