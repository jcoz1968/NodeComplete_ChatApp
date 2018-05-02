var socket = io();

socket.on('connect', function()  {
    console.log('connected to server.');
    
    socket.emit('createEmail', {
        to: 'brennacosby@yahoo.com',
        text: 'miss you!'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server.')
});

socket.on('newEmail', function(email) {
    console.log('New Email', email)
});