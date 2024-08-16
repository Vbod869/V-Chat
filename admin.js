const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to send a message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('Admin', message);
        messageInput.value = '';
        // Simulate sending message to user
        localStorage.setItem('adminMessage', message);
        // Clear previous user message
        localStorage.removeItem('userMessage');
    }
});

// Function to add a message to the chat
function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;

    // Add classes based on sender
    if (sender === 'Admin') {
        messageDiv.classList.add('message', 'admin-message');
    } else if (sender === 'User') {
        messageDiv.classList.add('message', 'user-message');
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

// Listen for changes in localStorage to update chat across devices
window.addEventListener('storage', (event) => {
    if (event.key === 'adminMessage' || event.key === 'userMessage') {
        const storedMessage = event.newValue;
        if (storedMessage) {
            addMessage(event.key === 'adminMessage' ? 'Admin' : 'User', storedMessage);
        }
    }
});
