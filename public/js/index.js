var socket = io();

socket.on('connect', function()  {
    console.log('connected to server.');
});

socket.on('disconnect', function() {
    console.log('disconnected from server.')
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
    console.log('newMessage', message);
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageEl = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageEl.val()
    }, function() {
        messageEl.val('');
    });
});

var locationButton = $("#send-location");

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported in your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('unable to fetch location.');
        locationButton.removeAttr('disabled').text('Send location');
    });
});
