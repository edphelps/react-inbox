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
    console.log('App:componentDidMountx()');
    this.loadMessages();
  }

  /* **********************************
  *  toggleSelected()
  *  Called when selcted checkbox is toggled
  ************************************* */
  toggleSelected = (id) => {
    this.setState((prevState) => {

      // toggle the selection
      const { setofSelectedMessages } = prevState;
      if (setofSelectedMessages.has(id)) setofSelectedMessages.delete(id);
      else setofSelectedMessages.add(id);

      // update state
      return {
        setofSelectedMessages,
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
  *  toggleSelectAll()
  *  toggle selection of all messages or clear message selection
  ************************************* */
  toggleSelectAll = () => {
    console.log('App:toggleSelectAll()');
    this.setState((prevState) => {
      const { setofSelectedMessages, messages } = prevState;

      // if there are selections, clear them
      if (setofSelectedMessages.size) {
        setofSelectedMessages.clear();

      // else select all messages
      } else {
        messages.forEach(message => setofSelectedMessages.add(message.id));
      }
      return {
        setofSelectedMessages,
      };
    });
  }

  /* **********************************
  *  markSelectedAsRead()
  ************************************* */
  markSelectedAsRead = async () => {
    console.log('App::markSelectedAsRead()');
    const { setofSelectedMessages } = this.state;
    const aIds = [...setofSelectedMessages];
    await model.asyncMarkAsRead(aIds);
    this.loadMessages();
  }

  /* **********************************
  *  markSelectedAsUnread()
  ************************************* */
  markSelectedAsUnread = async () => {
    console.log('App::markSelectedAsUnread()');
    const { setofSelectedMessages } = this.state;
    const aIds = [...setofSelectedMessages];
    await model.asyncMarkAsUnread(aIds);
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

    // short-circuit: still loading
    if (!messages) {
      return (
        <div>
          loading.....
        </div>
      )
    }

    // render
    return (
      <div className="container App">
        <Toolbar
          setofSelectedMessages={setofSelectedMessages}
          cntAll={messages.length}
          cntUnread={cntUnread}
          toggleSelectAllCB={this.toggleSelectAll}
          markSelectedAsReadCB={this.markSelectedAsRead}
          markSelectedAsUnreadCB={this.markSelectedAsUnread}
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
