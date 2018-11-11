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
*  Message Component displays a message.
*  State:  no state, TODO: switch to function
********************************************************* */
export default class Message extends Component {
  /* **********************************
  *  constructor
  ************************************* */
  constructor(props) {
    super(props);
    // this.state = {
    //   isSelected: false,
    // };
  }

  /* **********************************
  *  onclickStar
  ************************************* */
  onclickStar = () => {
    console.log('Message::onclickStar');
    const { toggleStarredCB, message } = this.props;
    const { id } = message;
    toggleStarredCB(id);
  }

  /* **********************************
  *  onchangeSelected
  ************************************* */
  onchangeSelected = () => {
    console.log('Message::onchangeSelected');
    const { toggleSelectedCB, message } = this.props;
    const { id } = message;
    toggleSelectedCB(id);
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Message::render()');
    const { message, selected } = this.props;
    const {
      body, id, labels, read, starred, subject
    } = message;

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
            <a href="#">{subject}</a>
          </div>
        </div>
      </div>
    );
  }
}
