
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('WebSocket connection established.');
};

socket.onmessage = (event) => {
  console.log('Received message:', event.data);
  const message = event.data;
  const messagesDiv = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

socket.onclose = () => {
  console.log('WebSocket connection closed.');
};

const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', () => {
  console.log('Send button clicked');
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;
  console.log('Sending message:', message);
  socket.send(message);
  messageInput.value = '';
  const messagesDiv = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = `You: ${message}`;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

const messageInput = document.getElementById('message-input');
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
  }
});