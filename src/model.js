
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

export default {
  asyncLoadMessages,
  asyncToggleStarred,
};
