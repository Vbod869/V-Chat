const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('User', message);
        messageInput.value = '';
        // Simulate sending message to user
        localStorage.setItem('userMessage', message);
        // Clear message for user
        localStorage.removeItem('adminMessage');
    }
});

function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    // Add classes based on sender
    if (sender === 'User') {
        messageDiv.classList.add('message', 'user-message');
    } else if (sender === 'Admin') {
        messageDiv.classList.add('message', 'admin-message');
    }

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}

// Simulate receiving user messages
setInterval(() => {
    const adminMessage = localStorage.getItem('adminMessage');
    if (adminMessage) {
        addMessage('Admin', adminMessage);
        localStorage.removeItem('adminMessage'); // Clear the admin message after displaying
    }
}, 1000);
