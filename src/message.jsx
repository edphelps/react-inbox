import React, { Component } from 'react';

/* ******************************************************
*  Label displays a single label
********************************************************* */
const Label = ({ label }) => {
  console.log(`Label::render(${label})`);
  return (
    <span className="label label-warning">{ label }</span>
  );
};

/* ******************************************************
*  Labels lists labels
********************************************************* */
const Labels = ({ labels }) => {
  console.log('Labels::render()');
  return (
    <span>
      { labels.map(label => <Label key={label} label={label} />) }
    </span>
  );
};

/* ******************************************************
*  MessageBody displays the body of a message
********************************************************* */
const MessageBody = ({ body }) => {
  console.log('MessageBody::render');
  return (
    <div className="row message-body">
      <div className="col-xs-11 col-xs-offset-1">
        {body}
      </div>
    </div>
  );
};

/* ******************************************************
*  Message Component displays a message.
*  State:  no state, TODO: switch to function
********************************************************* */
export default class Message extends Component {
  state = {
    // is the message expanded to show its body?
    isExpanded: false,
  }
  /* **********************************
  *  onclickStar
  *  Did user click star?
  ************************************* */
  onclickStar = () => {
    console.log('Message::onclickStar');
    const { toggleStarredCB, message } = this.props;
    const { id } = message;
    toggleStarredCB(id);
  }

  /* **********************************
  *  onchangeSelected
  *  Did user click the checkbox to select the message?
  ************************************* */
  onchangeSelected = () => {
    console.log('Message::onchangeSelected');
    const { toggleSelectedCB, message } = this.props;
    const { id } = message;
    toggleSelectedCB(id);
  }

  /* **********************************
  *  onClickMessage
  *  Click on message to expand / contract the message body
  ************************************* */
  onClickMessage = () => {
    console.log('Message::onClickMessage');
    this.setState({ isExpanded: !this.state.isExpanded})
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Message::render()');
    const { message, selected } = this.props;
    const { body, id, labels, read, starred, subject} = message;
    const { isExpanded } = this.state;

    return (
      <div>
        <div className={`row message ${(read ? 'read' : 'unread')} ${(selected ? 'selected' : '')}`}>
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" checked={selected} onChange={this.onchangeSelected} />
              </div>
              <div className="col-xs-2">
                <i className={`${((starred) ? 'fas fa-star' : 'far fa-star')}`} onClick={this.onclickStar} />
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            <Labels labels={labels} />
            <a href="#" onClick={this.onClickMessage}>{subject}</a>
          </div>
        </div>
        {isExpanded ? (<MessageBody body={body} />) : ('')}
      </div>
    );
  }
}
