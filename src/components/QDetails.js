import React from 'react';

export default class QDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      qType: 'Multiple Choice',
    };
  }

  titleHandleChange = (event) => {
    this.setState({ title: event.target.value });
  }

  qTypeHandleChange = (event) => {
    this.setState({ qType: event.target.value });
  }

  render() {
    return (
      <form>
        <label>
          <span
            className='label-text'>
            Title:
          </span>
          <input
            id="titleField"
            className="input-field"
            type="text"
            name="title"
            onChange={this.titleHandleChange}
            value={this.state.title}
          />
        </label>

        <label>
          <span
            className='label-text'>
            Type:
          </span>
          <span
            id='qTypeDropDownWrapper'
            className='input-field'>
            <select
              id='qTypeDropDown'
              className='input-field'
              value={this.state.value}
              onChange={this.handleChange}>
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="Numerical">Numerical</option>
              <option value="Short Text">Short Text</option>
            </select>
          </span>
        </label>
      </form>
    );
  }
}