const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('Admin', message);
        messageInput.value = '';
        // Simulate sending message to user
        localStorage.setItem('adminMessage', message);
        // Clear message for user
        localStorage.removeItem('userMessage');
    }
});

function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    // Add classes based on sender
    if (sender === 'Admin') {
        messageDiv.classList.add('message', 'admin-message'); // Corrected class for Admin
    } else if (sender === 'User') {
        messageDiv.classList.add('message', 'user-message'); // Corrected class for User
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Simulate receiving user messages
setInterval(() => {
    const userMessage = localStorage.getItem('userMessage');
    if (userMessage) {
        addMessage('User', userMessage);
        localStorage.removeItem('userMessage'); // Clear the user message after displaying
    }
}, 1000);
