import React, {useState} from 'react';

export function Navbar(props) {
    return (
      <nav className='navbar'>
        <div className='logo'>
          <img src='https://dividni.com/images/Dividni-Logo-White.svg' alt='' />
        </div>
        <ul className='export-buttons'>
          {props.children}
        </ul>
      </nav>
    )
  }
  
 export function NavItem(props) {
    const [open, setOpen] = useState();
  
    if (open) {
      //TODO
    }
  
    return (
      <li className='nav-item'>
        <button href='#'
          className='nav-button'
          onClick={() => setOpen(!open)}
        >
          {props.icon}
        </button>
      </li>
    )
  }