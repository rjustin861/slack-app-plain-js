const url = 'http://localhost:3000';

const input_message = document.querySelector('input.input-message');
const messages_container = document.querySelector('#messages-container');
const channels_container = document.querySelector('#channels-container');

let selected_channel = '';

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*'
    }
}

const getChannel = () => {
    return fetch(`${url}/channels`)
        .then(res => res.json())
        .then(data => data);
}

const getMessagesByChannelId = (channelId) => {
    return fetch(`${url}/messages?channel=${channelId}`)
        .then(res => res.json())
        .then(data => data);
}

const postMessage = (body, channelId) => {
    return axios.post( `${url}/messages`, {body, channelId, 'user': '5cb6f047f5e8e648f8321c19'}, axiosConfig ).then(response => response.data);
}

const deleteMessage = (messageId) => {
    return axios.delete( `${url}/messages/${messageId}`, axiosConfig ).then(response => response.data);
}

const updateMessage = (messageId, likes) => {
    return axios.patch( `${url}/messages/${messageId}`, {likes}, axiosConfig ).then((response) => response.data);
}

const createChannelElement = (id, name) => {
    const li = document.createElement('li');
    const channel_name = document.createTextNode(name);
    li.id = id;
    li.className = 'channel'
    li.appendChild(channel_name);
    return li;
}

const createMessageElement = (id, author, message, likes, createdDate) => {
    const li = document.createElement('li');

    let divParent = document.createElement('div');
    divParent.className = 'main';

    let div = document.createElement('div');
    let text = document.createTextNode(author);
    div.className = 'author';
    div.appendChild(text);
    divParent.appendChild(div);

    let span = document.createElement('span');
    text = document.createTextNode(format_date(createdDate));
    span.className = 'date';
    span.appendChild(text);
    div.appendChild(span);

    div = document.createElement('div');
    text = document.createTextNode(message);
    div.className = 'message';
    div.appendChild(text);
    divParent.appendChild(div);

    li.appendChild(divParent);

    div = document.createElement('div');
    div.className = 'extra';
    let button = document.createElement('button');
    text = document.createTextNode('Like');
    button.className = 'btn';
    button.classList.add('btn-primary');
    button.classList.add('btn-like');
    button.appendChild(text);
    div.appendChild(button);

    if(!likes)
        likes = 0;

    span = document.createElement('span');
    text = document.createTextNode(likes);
    span.className = 'score';
    span.appendChild(text);
    div.appendChild(span);

    button = document.createElement('button');
    text = document.createTextNode('x');
    button.className = 'btn';
    button.classList.add('btn-danger');
    button.classList.add('btn-remove');
    button.appendChild(text);
    div.appendChild(button);
    
    li.id = id;
    li.appendChild(div);

    return li;
}

const format_date = (createdDate) => {
    return (new Date(createdDate).getDate() + 1) + '-' + (new Date(createdDate).getMonth() + 1) + '-' + new Date(createdDate).getFullYear() +  ' ' + new Date(createdDate).getHours() + ':' + new Date(createdDate).getMinutes();
}

const scrollToBottom = () => {
    let scroll = document.querySelector('#messages-container').scrollHeight;
    document.querySelector('#messages-container').scrollTo(0, scroll);
}

document.addEventListener('keyup', function(e) {
    if(e.which === 13) {
        if(input_message.value == '') {
            document.querySelector('div.alert').classList.remove('hidden');
            return;
        }
        document.querySelector('div.alert').classList.add('hidden');

        postMessage(input_message.value, selected_channel)
            .then((message) => {
                console.log(message);
                
                const li = createMessageElement(message._id, message.user.name, message.body, message.likes, message.createdDate);
                messages_container.appendChild(li);

                input_message.value = '';
                input_message.focus();

                scrollToBottom();
            })
    }
});

document.addEventListener('click', function(e) {
    if(e.target.matches('li.channel')) {

        const lis = document.querySelectorAll('li.channel');
        lis.forEach((li) => {
            li.classList.remove('highlight');
        })
        e.target.classList.add('highlight');

        messages_container.innerHTML = '';

        document.querySelector('#channel-name').innerHTML = e.target.innerHTML;

        selected_channel = e.target.id;

        getMessagesByChannelId(selected_channel)
            .then((messages) => {
                messages.forEach((message) => {
                    console.log(message);
                    
                    const li = createMessageElement(message._id, message.user.name, message.body, message.likes, message.createdDate);
                    messages_container.appendChild(li);

                    scrollToBottom();
                });
            });
    }
});

document.addEventListener('click', function(e) {
    if(e.target.matches('button.btn-remove')) {
        const target = e.target.parentNode.parentNode;
        const messageId = target.id;

        deleteMessage(messageId)
            .then((message) => {
                messages_container.removeChild(target);
            });
    }
});

document.addEventListener('click', function(e) {
    if(e.target.matches('button.btn-like')) {
        const target = e.target.parentNode.parentNode;
        const messageId = target.id;
        let value = e.target.nextSibling.innerHTML;
        value++;

        updateMessage(messageId, value)
            .then((message) => {
                e.target.nextSibling.innerHTML = message.likes;
            });
    }
})

getChannel().then((channels) => {
    channels.forEach((channel) => {
        const li = createChannelElement(channel._id, channel.name);
        channels_container.appendChild(li);
    });
    document.querySelectorAll('li.channel')[0].classList.add('highlight');
    document.querySelectorAll('li.channel')[0].click();
});