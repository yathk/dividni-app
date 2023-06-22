import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'


function SidebarHeader(props: any) {
  return (
    <div className='sidebar-header'>
      <button className='add-var-btn' onClick={() => props.onclick()}>
        <FontAwesomeIcon className='add-var-icon' icon={solid('plus')} size='xl' />
        <span>add new</span>
      </button>
    </div>
  )
}
