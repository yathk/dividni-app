import {useEffect} from 'react';

export default function SideBar({
  datastore,
  handleDataUpdated
}) {
  useEffect(() => handleDataUpdated());

  const variables = datastore.getAllVariables();
  const displayList = variables.map( v =>
    <SideBarItem key={v.id} name={v.title}/> 
  );
  
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        {displayList}
      </div>
    </div>
  )
}

function SideBarItem(props) {
  return (
    <div className='sidebar-item'>
      <span>{props.name}</span>
    </div>
  )
}