import React from 'react';

import './index.css';
import './CSS/sidebar.css';
import './CSS/navbar.css';

import SideBar from './components/sidebar_components';
import { Navbar, NavItem } from './components/navbar_components';
import { QDetails } from './components/qDetails_components';



function App() {
  return (
    <div className="App">
      <SideBar />
      <Navbar>
        <NavItem icon='save' />
        <NavItem icon='export' />
      </Navbar>
      <div className='page-content-container'>
        <div className='ques-details'>
          <QDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
