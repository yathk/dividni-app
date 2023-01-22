import logo from './logo.svg';
import './index.css';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <SideBar />
      <Navbar>
        <NavItem icon='save' />
        <NavItem icon='export' />
      </Navbar>
      <div className='ques-details'>
        <QDetails />
      </div>
    </div>
  );
}

// ######################
// Nav bar
// ######################

function Navbar(props) {
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

function NavItem(props) {
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

// ######################
// Side bar
// ######################

function SideBar(props) {
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

// ######################
// Nav bar
// ######################




class QDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      qType: 'Multiple Choice',
    };

    this.titleHandleChange = this.titleHandleChange.bind(this);
    this.qTypeHandleChange = this.qTypeHandleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  titleHandleChange(event) {
    this.setState({ title: event.target.value });
  }

  qTypeHandleChange(event) {
    this.setState({ qType: event.target.value });
  }



  render() {
    return (
      <form>
        <label>
          Title:
          <input
            className="input-field"
            type="text"
            name="title"
            onChange={this.titleHandleChange}
            value={this.state.title}
          />
        </label>

        <label>
          Type:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Multiple Choice">Grapefruit</option>
            <option value="Numerical">Lime</option>
            <option value="Short Text">Coconut</option>
          </select>
        </label>
      </form>
    );
  }
}


export default App;
