import React, { Component } from 'react';

export default class Toolbar extends Component {
  /* **********************************
  *  constructor
  ************************************* */
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Toolbar::render()');
    return (
      <div>
        toolbar
      </div>
    );
  }
}

// module.exports = Toolbar;
