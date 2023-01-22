export default function SideBar(props) {
  return (
    <div className='sidebar'>
      <SideBarItem
        id='@1'
        name='Distractor' />
    </div>
  )
}

function SideBarItem(props) {
  return (
    <div className='sidebar-item'>
      <span className='var-id'>{props.id}</span>
      <span>{props.name}</span>
    </div>
  )
}