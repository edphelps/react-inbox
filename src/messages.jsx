import React, { Component } from 'react';
import Message from './message';

/* ******************************************************
*  Messages component lists messages.
*  State:  tracks which messages are selected
********************************************************* */
export default class Messages extends Component {
  /* **********************************
  *  constructor
  ************************************* */
  constructor(props) {
    console.log("Messages::constructor()");
    super(props);

    // state to track which messages have been selected (checkbox)
    this.state = {
      setSelectedMessages: new Set(),
    };
  }

  /* **********************************
  *  toggleSelected()
  *  Called when selcted checkbox is toggled
  ************************************* */
  toggleSelected = (id) => {
    this.setState((prevState) => {
      const newState = { ...prevState };
      if (newState.setSelectedMessages.has(id)) {
        newState.setSelectedMessages.delete(id);
      } else {
        newState.setSelectedMessages.add(id);
      }

      return {
        newState,
      }
    });
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Messages::render()');

    const { messages, toggleStarredCB } = this.props;

    // if still loading...
    if (!messages) {
      return (
        <div>
          loading...
        </div>
      )
    }

    return (
      <div>
        { messages.map(message => (
          <Message
            key={message.id}
            message={message}
            selected={this.state.setSelectedMessages.has(message.id)}
            toggleSelectedCB={this.toggleSelected}
            toggleStarredCB={toggleStarredCB}
          />))}
      </div>
    );
  }
}
