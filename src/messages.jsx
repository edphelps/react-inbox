import React, { Component } from 'react';
import Message from './message';

/* ******************************************************
*  Messages component lists messages.
*  State:  tracks which messages are selected
********************************************************* */
export default class Messages extends Component {
  /* **********************************
  *  constructor, TODO: get rid of this
  ************************************* */
  constructor(props) {
    console.log("Messages::constructor()");
    super(props);
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Messages::render()');

    const {
      messages,
      selectedMessagesSet,
      toggleStarredCB,
      toggleSelectedCB
    } = this.props;

    // if still loading...
    if (!messages) {
      return (
        <div>
          loading...
        </div>
      );
    }

    return (
      <div>
        { messages.map(message => (
          <Message
            key={message.id}
            message={message}
            selected={selectedMessagesSet.has(message.id)}
            toggleSelectedCB={toggleSelectedCB}
            toggleStarredCB={toggleStarredCB}
          />))}
      </div>
    );
  }
}
