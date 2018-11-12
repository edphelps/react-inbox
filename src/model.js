
/* ******************************************************
*  asyncLoadMessages()
*  Loads all messages from db
*  returns = json of entire db
********************************************************* */
async function asyncLoadMessages() {
  console.log('Model::loadMessages()');
  const response = await fetch('http://localhost:8082/api/messages');
  const json = await response.json();
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

export default {
  asyncLoadMessages,
  asyncToggleStarred,
  asyncMarkAsRead,
  asyncMarkAsUnread,
};
