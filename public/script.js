document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    let name;
    let textarea = document.querySelector('#textarea');
    let messageArea = document.querySelector('.message-area');
    do {
        name = prompt('Please Enter your Name:');
    } while (!name);

    textarea.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendMessage(e.target.value);
        }
    });

    function sendMessage(message) {
        let msg = {
            user: name,
            message: message.trim()
        };
        // append message.
        appendMessage(msg, 'outgoing');
        textarea.value =''
        scrollToButtom()

        // send to server
        socket.emit('message', msg);
    }

    function appendMessage(msg, type) {
        let mainDiv = document.createElement('div');
        let className = type === 'outgoing' ? 'outgoing-message' : 'incoming-message';
        mainDiv.classList.add(className, 'message');
    
        let markUp = `
            <div class="message-content">
                <h3>${msg.name}</h3>
                <p>${msg.message}</p>
            </div>
        `;
        mainDiv.innerHTML = markUp;

        messageArea.appendChild(mainDiv);
    }

    // Receive the message

    socket.on('message',(msg)=>{
        appendMessage(msg, 'incoming')
        scrollToButtom()
    });

    function scrollToButtom(){
        messageArea.scrollTop = messageArea.scrollHeight
    }
});
