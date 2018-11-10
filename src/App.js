import React, { Component } from 'react';
import './App.css';
// const model = require('./model.js');
import MODELloadMessages from './model.js';
import Toolbar from './toolbar.jsx';


class App extends Component {
  state = {

    // ----------------
    // DON'T DELETE!!!!
    // ----------------
    // The following is loaded in componentDidMount
    // messages: [ {
    //  {
    //     "body": "Hey, it's Bilson,\n\nThe future is scary but ...",
    //     "id": 8,
    //     "labels": [],
    //     "read": true,
    //     "starred": true,
    //     "subject": "If we connect the sensor, we can get to the HDD port ..."
    //  },
    //  {...} ]
  }

  /* **********************************
  *  componentDidMount()
  *  load the books and get rendering
  ************************************* */
  async componentDidMount() {
    console.log('App:componentDidMount()');
    this.loadMessages();
  }

  /* **********************************
  *  loadMessages()
  *  Load messages from the api and setState()
  ************************************* */
  async loadMessages() {
    console.log('App:loadMessages()');
    this.setState({
      messages: await MODELloadMessages(),
    });
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log("messages: ", this.state.messages);
    return (
      <div className="App">
        <Toolbar />
        my app
      </div>
    );
  }
}

export default App;
