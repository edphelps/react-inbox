
export default async function loadMessages() {
// async function loadMessages() {
  console.log('Model::loadMessages()');
  const response = await fetch('http://localhost:8082/api/messages');
  const json = await response.json();
  return json
}

// export default { model: { loadMessages } }

// module.exports = {
//   loadMessages
// };
