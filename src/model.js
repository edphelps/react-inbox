
/* ******************************************************
*  asyncLoadMessages()
*  Loads all messages from db
*  returns = json of entire db
********************************************************* */
async function asyncLoadMessages() {
  console.log('Model::loadMessages()');
  let json = null;
  try {
    const response = await fetch('http://localhost:8082/api/messages');
    json = await response.json();
  } catch (err) {
    console.log('ERROR asyncLoadMessages: ', err);
    json = { error: 'failed to load messages from db' };
    throw new Error("unable to load messages, check that the data server is running: collective-api application")
  }
  return json;
}

/* ******************************************************
*  asyncToggleStarred()
*  Toggles the starred setting for a single messages
*  id - the message ID to toggle starred setting
*  returns - json of entire db
********************************************************* */
async function asyncToggleStarred(id) {
  console.log(`Model::asyncToggleStarred(${id}`);
  const body = {
    messageIds: [id],
    command: 'star',
  };
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

/* ******************************************************
*  asyncSetRead()
*  Mark selected messages as read or unread
*  aIds - array of mesage id's
*  flagRead - TRUE to set messages as read, FALSE to set them as unread
*  returns - json of entire db
********************************************************* */
async function asyncSetRead(aIds, flagRead) {
  console.log(`Model::asyncSetRead(`);
  const body = {
    messageIds: aIds,
    command: 'read',
    read: flagRead,
  };
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await response.json();
  console.log("----- json: ", json);
  return json;
}

/* ******************************************************
*  asyncMarkAsRead()
*  Mark selected messages as read.
*  aIds - array of mesage id's
*  returns - json of entire db
********************************************************* */
async function asyncMarkAsRead(aIds) {
  console.log(`Model::asyncMarkAsRead(${aIds}`);
  return asyncSetRead(aIds, true);
}

/* ******************************************************
*  asyncMarkAsUnread()
*  Mark selected messages as unread.
*  aIds - array of mesage id's
*  returns - json of entire db
********************************************************* */
async function asyncMarkAsUnread(aIds) {
  console.log(`Model::asyncMarkAsUnread(${aIds}`);
  return asyncSetRead(aIds, false);
}

/* ******************************************************
*  asyncDelete()
*  Delete selected messages
*  aIds - array of mesage id's
*  returns - json of entire db
********************************************************* */
async function asyncDelete(aIds) {
  console.log(`Model::asyncDelete(${aIds}`);
  const body = {
    messageIds: aIds,
    command: 'delete',
  };
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

/* ******************************************************
*  asyncSend()
*  Sends new message
*  subject - string
*  body - string
*  returns - json of entire db
********************************************************* */
async function asyncSend(subject, messageBody) {
  console.log('Model::asyncSend');
  const body = {
    subject,
    body: messageBody,
  };
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

/* ******************************************************
*  asyncApplyLabel()
*  Apply label to messages.
*  sLabel - label to apply
*  aIds - array of message ids to apply label to
*  returns - json of entire db
********************************************************* */
async function asyncApplyLabel(sLabel, aIds) {
  console.log(`Model::asyncApplyLabel(${sLabel}`);
  const body = {
    messageIds: aIds,
    command: 'addLabel',
    label: sLabel,
  };
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

/* ******************************************************
*  asyncRemoveLabel()
*  Remove label from messages.
*  sLabel - label to remove
*  aIds - array of message ids to remove label from
*  returns - json of entire db
********************************************************* */
async function asyncRemoveLabel(sLabel, aIds) {
  console.log(`Model::asyncRemoveLabel(${sLabel}`);
  const body = {
    messageIds: aIds,
    command: 'removeLabel',
    label: sLabel,
  };
  const response = await fetch('http://localhost:8082/api/messages', {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

export default {
  asyncLoadMessages,
  asyncToggleStarred,
  asyncMarkAsRead,
  asyncMarkAsUnread,
  asyncApplyLabel,
  asyncRemoveLabel,
  asyncDelete,
  asyncSend,
};
