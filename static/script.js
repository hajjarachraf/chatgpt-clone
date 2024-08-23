document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById('userInput');
    const submit = document.getElementById('submit');
    const output = document.getElementById('output');
    const newChatButton = document.getElementById('newChat');
    const history = document.querySelector('.history');

    submit.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') sendMessage();
    });

    newChatButton.addEventListener('click', function() {
        output.innerHTML = '';
        history.innerHTML = '';
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addToChat('You: ' + message);
        userInput.value = '';

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: message })
            });
            const data = await response.json();
            addToChat('ChaitanyaGPT: ' + data.response);
            addToHistory(message);
        } catch (error) {
            console.error('Error:', error);
            addToChat('Error: Unable to get response');
        }
    }

    function addToChat(message) {
        const p = document.createElement('p');
        p.textContent = message;
        output.appendChild(p);
        output.scrollTop = output.scrollHeight;
    }

    function addToHistory(message) {
        const p = document.createElement('p');
        p.textContent = message;
        p.addEventListener('click', function() {
            userInput.value = this.textContent;
        });
        history.appendChild(p);
    }
});