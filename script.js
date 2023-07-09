const socket = io();

const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Receive new message from server
socket.on('chat-message', data => {
    appendMessage(data);
});

// Send message to server
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        sendMessage(message);
    }
});

// Append message to the chat container
function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.appendChild(messageElement);
    messageInput.value = '';
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Send message to server
function sendMessage(message) {
    socket.emit('send-message', message);
    appendMessage(`You: ${message}`);
}
