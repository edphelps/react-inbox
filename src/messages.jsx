import React, { Component } from 'react';
import Message from './message';

export default class Messages extends Component {
  /* **********************************
  *  constructor
  ************************************* */
  constructor(props) {
    console.log("Messages::constructor()");
    super(props);
    this.state = {
      setSelectedMessages: new Set(),
    };
  }

  /* **********************************
  *  toggleSelected()
  *  toggle the selcted checkbox8
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

    // if still loading...
    const { messages, toggleStarredCB } = this.props;
    if (!messages) {
      return (
        <div>
          loading...
        </div>
      )
    }

    // determine if selected
    // const selected = this.setSelectedMessages.has(message.id);

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
