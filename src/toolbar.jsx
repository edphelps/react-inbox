import React, { Component } from 'react';

/* ******************************************************
*  Toolbar component .
*  State:  TODO fill this in, maybe isComposing?
********************************************************* */
export default class Toolbar extends Component {
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
    console.log('Toolbar::render()');
    const { setofSelectedMessages, cntUnread } = this.props;
    return (

      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge">{cntUnread}</span>
            unread message{(cntUnread===1) ? '' : 's'}
          </p>

          <a class="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button type="button" className="btn btn-default">
            <i className="far fa-check-square" />
          </button>

          <button type="button" className="btn btn-default">
            Mark As Read
          </button>

          <button type="button" className="btn btn-default">
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button type="button" className="btn btn-default">
            <i className="far fa-trash-alt" />
          </button>
        </div>
      </div>
    );
  }
}
