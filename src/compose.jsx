import React, { Component } from 'react';


/* ******************************************************
*  Compose Component displays compose form
*  Component called even when not showing (isComposing=false renders an empty span)
*    to ensure it remains in memory and retains the state of the for field.
*    If the parent didn't render it when it's not showing then when it
*    next rendered it would be reconstructed and the values for the subject
*    and body would be back to being blank.
*  State:  tracks the values of the two input fields
********************************************************* */
export default class Compose extends Component {

  /* **********************************
  *  constructor()
  ************************************* */
  constructor(props) {
    super(props);
    console.log('Compose::constructor()');
  }

  /* **********************************
  *  state
  ************************************* */
  state = {
    subject: '',
    body: '',
  };

  /* **********************************
  *  onSubmit()
  ************************************* */
  onSubmit = (e) => {
    console.log('Compose::onSubmit()');
    e.preventDefault();

    const { subject, body } = this.state;
    this.setState({ subject: '', body: '' });

    const { sendMessageCB } = this.props;
    sendMessageCB(subject, body);
  }

  /* **********************************
  *  onChange()
  ************************************* */
  onChange = () => {
    console.log('Compose:onChange()');

    this.setState(
      {
        subject: document.forms.composeForm.subject.value,
        body: document.forms.composeForm.body.value,
      },
    );
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Compose::render()');

    const { subject, body } = this.state;
    const { isComposing } = this.props;

    if (!isComposing) {
      return (
        <span />
      );
    }

    return (
      <div>
        <form id="composeForm" className="form-horizontal well" onSubmit={this.onSubmit}>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="subject"
                placeholder="Enter a subject"
                name="subject"
                value={subject}
                autoFocus
                onChange={this.onChange} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea
                name="body"
                id="body"
                className="form-control"
                value={body}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input
                type="submit"
                value="Send"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
