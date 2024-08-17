const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

let isLocalMessage = false; // Flag to prevent double adding of messages

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

// Function to send an admin message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Set flag before saving message to localStorage
        isLocalMessage = true;

        addMessage('Admin', message);
        messageInput.value = '';

        // Save message to localStorage to simulate sending message
        localStorage.setItem('adminMessage', JSON.stringify({
            sender: 'Admin',
            message: message,
            timestamp: new Date().getTime()
        }));

        // Reset flag after a short delay to allow storage event to be processed
        setTimeout(() => {
            isLocalMessage = false;
        }, 100);
    }
}

// Event listener for send button
sendButton.addEventListener('click', sendMessage);

// Listen for changes in localStorage to update chat across devices
window.addEventListener('storage', (event) => {
    if (!isLocalMessage && (event.key === 'adminMessage' || event.key === 'userMessage')) {
        const storedMessage = JSON.parse(event.newValue);
        if (storedMessage) {
            addMessage(storedMessage.sender, storedMessage.message);
        }
    }
});

// Simulate receiving user messages every second
setInterval(() => {
    const userMessage = localStorage.getItem('userMessage');
    if (userMessage) {
        const storedMessage = JSON.parse(userMessage);
        if (storedMessage) {
            addMessage('User', storedMessage.message);
            localStorage.removeItem('userMessage'); // Clear the user message after displaying
        }
    }
}, 1000);
