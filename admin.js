document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const questionButtonsContainer = document.getElementById('question-buttons-container');
    const typingIndicator = document.getElementById('typing-indicator');

    const predefinedQuestions = {
        "What is your name?": "I am a Sigit Barlianto.",
        "What services do you offer?": "I can assist with general inquiries.",
        "How can I contact support?": "You can reach support via email or phone.",
        "What are your working hours?": "Our working hours are from 9 AM to 5 PM.",
        "Where do you go to school?": "Smk Taruna Bhakti"
    };

    const adminQuestions = {
        "Can I get a refund?": "Please provide your order number, and I will assist you with the refund process.",
        "What is your company's return policy?": "You can return items within 30 days of purchase. Please check our website for more details.",
        "How can I track my order?": "Once your order is shipped, you will receive a tracking number via email.",
        "Do you offer international shipping?": "Yes, we offer international shipping to most countries. Please check our shipping policy for details.",
        "Can I change my order after placing it?": "If your order has not yet been processed, you can modify it by contacting our support team."
    };

    let isChatWithAdmin = false;

    function appendMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.classList.add('message');
        messageElement.classList.add(sender === 'You' ? 'user' : 'bot');
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom of the chat
    }

    function displayQuestionButtons(questions) {
        questionButtonsContainer.innerHTML = ''; // Clear previous buttons if any

        Object.keys(questions).forEach(question => {
            const button = document.createElement('button');
            button.textContent = question;
            button.classList.add('question-button');
            button.addEventListener('click', () => {
                handleUserMessage(question);
            });
            questionButtonsContainer.appendChild(button);
        });
    }

    function handleUserMessage(userMessage) {
        appendMessage("You", userMessage);

        if (isChatWithAdmin) {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                const adminResponse = adminQuestions[userMessage];
                if (adminResponse) {
                    appendMessage("Admin", adminResponse);
                } else {
                    appendMessage("Admin", "Ga ngerti gua sigit -_");
                }
            }, 2000);
            return;
        }

        const botResponse = predefinedQuestions[userMessage];

        if (botResponse) {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                appendMessage("Bot", botResponse);
            }, 2000);
        } else {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                appendMessage("Bot", "I'm sorry, I don't understand. Would you like to chat with an admin? 'Yes' or 'No'");
            }, 2000);
        }

        if (userMessage.toLowerCase() === "yes") {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                appendMessage("Bot", "Connecting you to an admin...");
                connectToAdmin();
            }, 2000);
        } else if (userMessage.toLowerCase() === "no") {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                appendMessage("Bot", "Okay, feel free to ask me anything else.");
            }, 2000);
        }
    }

    function connectToAdmin() {
        isChatWithAdmin = true;
        setTimeout(() => {
            appendMessage("Admin", "Hello, I'm the admin. How can I help you?");
            displayQuestionButtons(adminQuestions); // Show admin-specific questions
        }, 1000);  // Delay admin greeting by 1 second
    }

    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
    }

    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }

    sendButton.addEventListener('click', () => {
        const userMessage = messageInput.value;
        if (userMessage.trim() === "") return;
        handleUserMessage(userMessage);
        messageInput.value = '';
    });

    displayQuestionButtons(predefinedQuestions); // Initialize with predefined questions
    initChat();
});

function initChat() {
    setTimeout(() => {
        appendMessage("Bot", "Hello! How can I help you today?");
    }, 500);  // Initial greeting delay
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add('message');
    messageElement.classList.add(sender === 'You' ? 'user' : 'bot');
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom of the chat
}
