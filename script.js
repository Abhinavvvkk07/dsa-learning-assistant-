// DOM Elements
const messagesContainer = document.getElementById('messages-container');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const suggestionChips = document.getElementById('suggestion-chips');

// State
let isProcessing = false;

// Add message to chat
function addMessage(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    // Add avatar
    const avatarDiv = document.createElement('div');
    if (type === 'bot') {
        avatarDiv.className = 'avatar bot-avatar';
        avatarDiv.innerHTML = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="25" y="30" width="50" height="45" rx="5" fill="currentColor"/>
                <line x1="50" y1="20" x2="50" y2="30" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="18" r="3" fill="currentColor"/>
                <circle cx="40" cy="45" r="5" fill="white"/>
                <circle cx="60" cy="45" r="5" fill="white"/>
                <rect x="35" y="60" width="30" height="8" rx="2" fill="white"/>
            </svg>
        `;
    } else {
        avatarDiv.className = 'avatar user-avatar';
        avatarDiv.textContent = '👤';
    }
    
    // Add message content
    const messageBubble = document.createElement('div');
    messageBubble.className = type === 'bot' ? 'message-bubble bot-bubble' : 'message-bubble user-bubble';
    
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    messageBubble.appendChild(paragraph);
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(messageBubble);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom smoothly
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
    
    return messageDiv;
}

// Add thinking indicator
function addThinkingIndicator() {
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'message thinking bot';
    thinkingDiv.id = 'thinking-indicator';
    
    // Add avatar
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'avatar bot-avatar';
    avatarDiv.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="30" width="50" height="45" rx="5" fill="currentColor"/>
            <line x1="50" y1="20" x2="50" y2="30" stroke="currentColor" stroke-width="2"/>
            <circle cx="50" cy="18" r="3" fill="currentColor"/>
            <circle cx="40" cy="45" r="5" fill="white"/>
            <circle cx="60" cy="45" r="5" fill="white"/>
            <rect x="35" y="60" width="30" height="8" rx="2" fill="white"/>
        </svg>
    `;
    
    // Add thinking content
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble bot-bubble';
    const paragraph = document.createElement('p');
    paragraph.textContent = 'Thinking...';
    messageBubble.appendChild(paragraph);
    
    thinkingDiv.appendChild(avatarDiv);
    thinkingDiv.appendChild(messageBubble);
    messagesContainer.appendChild(thinkingDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
    
    return thinkingDiv;
}

// Remove thinking indicator
function removeThinkingIndicator() {
    const thinkingIndicator = document.getElementById('thinking-indicator');
    if (thinkingIndicator) {
        thinkingIndicator.remove();
    }
}

// Hide suggestion chips
function hideSuggestionChips() {
    if (suggestionChips) {
        suggestionChips.classList.add('hidden');
    }
}

// Send message to backend (keeping existing API logic)
async function sendMessage(message) {
    if (!message.trim() || isProcessing) {
        return;
    }
    
    // Hide suggestion chips after first message
    hideSuggestionChips();
    
    isProcessing = true;
    sendButton.disabled = true;
    userInput.disabled = true;
    
    // Add user message
    addMessage('user', message);
    
    // Add thinking indicator
    addThinkingIndicator();
    
    try {
        // Call Claude API endpoint
        const response = await fetch('/api/claude-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to get response');
        }
        
        const data = await response.json();
        
        // Remove thinking indicator
        removeThinkingIndicator();
        
        // Add bot response
        addMessage('bot', data.reply);
        
    } catch (error) {
        console.error('Error:', error);
        
        // Remove thinking indicator
        removeThinkingIndicator();
        
        // Add error message
        addMessage('bot', 'Sorry, I encountered an error. Please try again.');
    } finally {
        isProcessing = false;
        sendButton.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

// Event Listeners
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        sendMessage(message);
        userInput.value = '';
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
            userInput.value = '';
        }
    }
});

// Handle suggestion chip clicks
if (suggestionChips) {
    const chips = suggestionChips.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const message = chip.getAttribute('data-message');
            if (message) {
                userInput.value = message;
                sendMessage(message);
                userInput.value = '';
            }
        });
    });
}

// Focus input on page load
document.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
});
