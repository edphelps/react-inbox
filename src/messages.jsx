import React, { Component } from 'react';
import Message from './message';

export default class Messages extends Component {
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
    console.log('Messages::render()');
    const { messages, toggleStarredCB } = this.props;
    if (!messages) {
      return (
        <div>
          loading...
        </div>
      )
    }
    return (
      <div>
        { messages.map(message => <Message key={message.id} message={message} toggleStarredCB={toggleStarredCB} />)}
      </div>
    );
  }
}
