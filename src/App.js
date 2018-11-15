

// TO RUN:
//
// -- MUST BE running the data server from project "collective-api"
// -- http://localhost:3000/

import React, { Component } from 'react';
import './App.css';

import model from './model';
import Toolbar from './toolbar';
import Messages from './messages';
import Compose from './compose';

class App extends Component {
  state = {

    // track which messages have been selected (via checkbox)
    selectedMessagesSet: new Set(),

    // are we in compose mode
    isComposing: false,

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
      const { selectedMessagesSet } = prevState;
      if (selectedMessagesSet.has(id)) selectedMessagesSet.delete(id);
      else selectedMessagesSet.add(id);

      // update state
      return {
        selectedMessagesSet,
      };
    });
  }

  /* **********************************
  *  toggleCompose()
  *  Called when compose button on toolbar is clicked
  ************************************* */
  toggleCompose= () => {
    const { isComposing } = this.state;
    this.setState({
      isComposing: !isComposing,
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
  *  markMessageRead()
  *  nark a message as read
  ************************************* */
  markMessageRead = async (id) => {
    console.log(`App:markMessageRead(${id})`);
    const aIds = [id];
    await model.asyncMarkAsRead(aIds);
    this.loadMessages();
  }

  /* **********************************
  *  toggleSelectAll()
  *  toggle selection of all messages or clear message selection
  ************************************* */
  toggleSelectAll = () => {
    console.log('App:toggleSelectAll()');
    this.setState((prevState) => {
      const { selectedMessagesSet, messages } = prevState;

      // if there are selections, clear them
      if (selectedMessagesSet.size) {
        selectedMessagesSet.clear();

      // else select all messages
      } else {
        messages.forEach(message => selectedMessagesSet.add(message.id));
      }
      return {
        selectedMessagesSet,
      };
    });
  }

  /* **********************************
  *  markSelectedAsRead()
  ************************************* */
  markSelectedAsRead = async () => {
    console.log('App::markSelectedAsRead()');
    const { selectedMessagesSet } = this.state;
    const aIds = [...selectedMessagesSet];
    await model.asyncMarkAsRead(aIds);
    this.loadMessages();
  }

  /* **********************************
  *  markSelectedAsUnread()
  ************************************* */
  markSelectedAsUnread = async () => {
    console.log('App::markSelectedAsUnread()');
    const { selectedMessagesSet } = this.state;
    const aIds = [...selectedMessagesSet];
    await model.asyncMarkAsUnread(aIds);
    this.loadMessages();
  }

  /* **********************************
  *  deleteSelected()
  ************************************* */
  deleteSelected = async () => {
    console.log('App::deleteSelected()');
    const { selectedMessagesSet } = this.state;
    const aIds = [...selectedMessagesSet];
    await model.asyncDelete(aIds);

    this.setState(() => {
      // ckear all selections
      selectedMessagesSet.clear();
      // update state
      return {
        selectedMessagesSet,
      };
    });

    this.loadMessages();
  }

  /* **********************************
  *  sendMessage()
  ************************************* */
  sendMessage = async (subject, body) => {
    console.log('App::sendMessage()');

    await model.asyncSend(subject, body);

    this.setState({ isComposing: false });
    this.loadMessages();
  }

  /* **********************************
  *  applyLabelToSelected()
  ************************************* */
  applyLabelToSelected = async (sLabel) => {
    console.log(`App::applyLabelToSelected(${sLabel})`);
    const { selectedMessagesSet } = this.state;
    const aIds = [...selectedMessagesSet];
    await model.asyncApplyLabel(sLabel, aIds);
    this.loadMessages();
  }

  /* **********************************
  *  removeLabelFromSelected()
  ************************************* */
  removeLabelFromSelected = async (sLabel) => {
    console.log(`App::removeLabelFromSelected(${sLabel})`);
    const { selectedMessagesSet } = this.state;
    const aIds = [...selectedMessagesSet];
    await model.asyncRemoveLabel(sLabel, aIds);
    this.loadMessages();
  }

  /* **********************************
  *  loadMessages()
  *  Load messages from the api and setState()
  ************************************* */
  async loadMessages() {
    console.log('App:loadMessages()');
    let messages = [];
    try {
      messages = await model.asyncLoadMessages();
    } catch (err) {
      console.log('ERROR loadMessages(): ', err);
      messages = [
        {
          body: 'no body',
          id: 0,
          labels: [],
          read: true,
          starred: true,
          subject: 'ERROR: backend db server needs to be started: collective-api application',
        },
      ];
    }
    this.setState({
      messages,
    });
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    const { messages, selectedMessagesSet, isComposing } = this.state;

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
      );
    }

    // render
    return (
      <div className="container App">
        <Toolbar
          selectedMessagesSet={selectedMessagesSet}
          cntAll={messages.length}
          cntUnread={cntUnread}
          toggleSelectAllCB={this.toggleSelectAll}
          markSelectedAsReadCB={this.markSelectedAsRead}
          markSelectedAsUnreadCB={this.markSelectedAsUnread}
          applyLabelToSelectedCB={this.applyLabelToSelected}
          removeLabelFromSelectedCB={this.removeLabelFromSelected}
          deleteSelectedCB={this.deleteSelected}
          toggleComposeCB={this.toggleCompose}
        />
        <Compose
          isComposing={isComposing}
          sendMessageCB={this.sendMessage}
        />
        <Messages
          messages={messages}
          selectedMessagesSet={selectedMessagesSet}
          toggleStarredCB={this.toggleStarred}
          toggleSelectedCB={this.toggleSelected}
          markMessageReadCB={this.markMessageRead}
        />
      </div>
    );
  }
}

export default App;
