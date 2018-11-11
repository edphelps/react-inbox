import React, { Component } from 'react';

const Label = ({ label }) => {
  console.log(`Label::render(${label})`);
  return (
    <span className="label label-warning">{ label }</span>
  );
};

const Labels = ({ labels }) => {
  console.log('Labels::render()');
  return (
    <span>
      { labels.map(label => <Label key={label} label={label} />) }
    </span>
  );
};

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
  *  onclickSelect
  ************************************* */
  onclickSelect = () => {
    console.log('Message::onclickSelect');
    const { toggleSelectedCB, message } = this.props;
    const { id } = message;
    toggleSelectedCB(id);

    // Version that tracks state locally
    // this.setState((prevState) => {
    //   const newState = { ...prevState };
    //   newState.isSelected = !prevState.isSelected;
    //   return {
    //     newState,
    //   }
    // });
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Message::render()');
    // const { message } = this.props;
    // const { selected } = this.state;
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
                <input type="checkbox" checked={selected} onChange={this.onclickSelect} />
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
