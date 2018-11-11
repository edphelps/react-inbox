import React, { Component } from 'react';
import './App.css';

import model from './model';
import Toolbar from './toolbar';
import Messages from './messages';

class App extends Component {
  state = {

    // track which messages have been selected (via checkbox)
    setofSelectedMessages: new Set(),

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
  *  toggleSelected()
  *  Called when selcted checkbox is toggled
  ************************************* */
  toggleSelected = (id) => {
    this.setState((prevState) => {
      const newState = { ...prevState };
      if (newState.setofSelectedMessages.has(id)) {
        newState.setofSelectedMessages.delete(id);
      } else {
        newState.setofSelectedMessages.add(id);
      }
      return {
        newState,
      };
    });
  }

  /* **********************************
  *  toggleStarred()
  *  toggle starred state
  ************************************* */
  toggleStarred = async (id) => {
    console.log(`App:toggleStarred(${id})`);
    await model.asyncToggleStarred(id);
    this.loadMessages();
  }

  /* **********************************
  *  loadMessages()
  *  Load messages from the api and setState()
  ************************************* */
  async loadMessages() {
    console.log('App:loadMessages()');
    this.setState({
      messages: await model.asyncLoadMessages(),
    });
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    const { messages, setofSelectedMessages } = this.state;

    // get the unread count to pass to toolbar
    let cntUnread = 0;
    if (messages) {
      cntUnread = messages.reduce((a, c) => {
        const retVal = a + ((!c.read) ? 1 : 0);
        return retVal;
      }, 0);
    }

    // render
    return (
      <div className="container App">
        <Toolbar
          setofSelectedMessages={setofSelectedMessages}
          cntUnread={cntUnread}
        />
        <Messages
          messages={messages}
          setofSelectedMessages={setofSelectedMessages}
          toggleStarredCB={this.toggleStarred}
          toggleSelectedCB={this.toggleSelected}
        />
      </div>
    );
  }
}

export default App;
