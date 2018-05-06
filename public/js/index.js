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

socket.emit('createMessage', {
    from: 'Fred',
    text: 'Hi'
}, function(data) {
    console.log(data);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});

var locationButton = $("#send-location");

locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported in your browser');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        alert('unable to fetch location.');
    });
});
