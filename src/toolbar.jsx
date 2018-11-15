import React, { Component } from 'react';

/* ******************************************************
*  Toolbar component .
*  State:  TODO fill this in, maybe isComposing?
********************************************************* */
export default class Toolbar extends Component {
  /* **********************************
  *  onclickSelectAll()
  *  click the select all / clear all button
  ************************************* */
  onclickSelectAll = () => {
    console.log('Toolbar::onclickSelectAll()');
    const { toggleSelectAllCB } = this.props;
    toggleSelectAllCB();
  }

  /* **********************************
  *  onclickMarkAsRead()
  ************************************* */
  onclickMarkAsRead = () => {
    console.log('Toolbar::onclickMarkAsRead()');
    const { markSelectedAsReadCB } = this.props;
    markSelectedAsReadCB();
  }

  /* **********************************
  *  onclickMarkAsUnread()
  ************************************* */
  onclickMarkAsUnread = () => {
    console.log('Toolbar::onclickMarkAsUnread()');
    const { markSelectedAsUnreadCB } = this.props;
    markSelectedAsUnreadCB();
  }

  /* **********************************
  *  onclickDelete()
  ************************************* */
  onclickDelete = () => {
    console.log('Toolbar::onclickDelete()');
    const { deleteSelectedCB } = this.props;
    deleteSelectedCB();
  }

  /* **********************************
  *  onchangeApplyLabel()
  ************************************* */
  onchangeApplyLabel = (e) => {
    console.log('Toolbar::onselectApplyLabel: ', e.target.options[e.target.selectedIndex].text);

    const { applyLabelToSelectedCB } = this.props;
    const idx = e.target.selectedIndex;

    // first selection in list is a heading, not a label
    if (idx === 0) return;

    applyLabelToSelectedCB(e.target.options[idx].text);

    // reset selection to the heading for the list
    e.target.selectedIndex = 0;
  }

  /* **********************************
  *  onchangeRemoveLabel()
  ************************************* */
  onchangeRemoveLabel = (e) => {
    console.log('Toolbar::onselectRemoveLabel: ', e.target.options[e.target.selectedIndex].text);

    const { removeLabelFromSelectedCB } = this.props;
    const idx = e.target.selectedIndex;

    // first selection in list is a heading, not a label
    if (idx === 0) return;

    removeLabelFromSelectedCB(e.target.options[idx].text);

    // reset selection to the heading for the list
    e.target.selectedIndex = 0;
  }

  /* **********************************
  *  render()
  ************************************* */
  render() {
    console.log('Toolbar::render()');
    const { setofSelectedMessages, cntAll, cntUnread } = this.props;

    // determine icon for the select_all / clear_all button at left of toolbar
    let sbtnSelectAll = null;
    if (!setofSelectedMessages.size) { // none selected
      sbtnSelectAll = 'far fa-square';
    } else if (setofSelectedMessages.size === cntAll) { // all selected
      sbtnSelectAll = 'far fa-check-square';
    } else { // some selected
      sbtnSelectAll = 'far fa-minus-square';
    }

    // detmine if bulk action buttons should be disabled
    const disableBulkActionButtons = setofSelectedMessages.size === 0;

    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge">{cntUnread}</span>
            unread message
            {(cntUnread === 1) ? '' : 's'}
          </p>

          {/* Compose new message */}
          <a className="btn btn-danger">
            <i className="fa fa-plus" />
          </a>

          {/* Select all / Clear all */}
          <button type="button" className="btn btn-default" onClick={this.onclickSelectAll}>
            <i className={sbtnSelectAll} />
          </button>

          {/* bulk actions */}
          <button type="button" className="btn btn-default" onClick={this.onclickMarkAsRead} disabled={disableBulkActionButtons}>
            Mark As Read
          </button>
          <button type="button" className="btn btn-default" onClick={this.onclickMarkAsUnread} disabled={disableBulkActionButtons}>
            Mark As Unread
          </button>
          <select className="form-control label-select" onChange={this.onchangeApplyLabel} disabled={disableBulkActionButtons}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>
          <select className="form-control label-select" onChange={this.onchangeRemoveLabel} disabled={disableBulkActionButtons}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          {/* trash can */}
          <button type="button" className="btn btn-default" onClick={this.onclickDelete} disabled={disableBulkActionButtons}>
            <i className="far fa-trash-alt" />
          </button>
        </div>
      </div>
    );
  }
}
