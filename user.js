const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to add a message to the chat
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

// Function to send a user message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        addMessage('User', message);
        messageInput.value = '';

        // Save message to localStorage to simulate sending message
        localStorage.setItem('userMessage', JSON.stringify({
            sender: 'User',
            message: message,
            timestamp: new Date().getTime()
        }));
    }
}

// Event listener for send button
sendButton.addEventListener('click', sendMessage);

// Listen for changes in localStorage to update chat across devices
window.addEventListener('storage', (event) => {
    if (event.key === 'userMessage' || event.key === 'adminMessage') {
        const storedMessage = JSON.parse(event.newValue);
        if (storedMessage) {
            addMessage(storedMessage.sender, storedMessage.message);
        }
    }
});

// Simulate receiving admin messages every second
setInterval(() => {
    const adminMessage = localStorage.getItem('adminMessage');
    if (adminMessage) {
        const storedMessage = JSON.parse(adminMessage);
        if (storedMessage) {
            addMessage('Admin', storedMessage.message);
            localStorage.removeItem('adminMessage'); // Clear the admin message after displaying
        }
    }
}, 1000);
