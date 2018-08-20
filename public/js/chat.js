

function scrollToBottom(){
    //Selectors
    var messages= jQuery('#messages');
    var newMessage= messages.children('li:last-child');
    //Heights
    var clientHeight= messages.prop('clientHeight');
    var scrollTop= messages.prop('scrollTop');
    var scrollHeight= messages.prop('scrollHeight');
    var newMessageHeight= newMessage.innerHeight();
    var lastMessageHeight= newMessage.prev().innerHeight();

    if(clientHeight+ scrollTop+ newMessageHeight+ lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
      
    }
};

var socket= io();

socket.on('connect',function (){
    var params= jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href='/';
        }else{
            console.log('No error');
        }
    });

});

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
});

socket.on('updateUserList',function(users){
    var ol=jQuery('<ol></ol>');

    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol); //jo append ktu se duam ta rishkruajme listen
});

socket.on('updateUserList',function(users){
    console.log('Users list',users);
});

socket.on('newMessage', function(message){
    var formattedTime= moment(message.createdAt).format('h:mm a');
    var template= jQuery('#message-template').html();
    var html= Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);

    // var formattedTime= moment(message.createdAt).format('h:mm a');
    // console.log('newMessage',message);
    // var li= jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    var formattedTime= moment(message.createdAt).format('h:mm a');
    var template= jQuery('#location-message-template').html();
    var html= Mustache.render(template,{
        url:message.url,
        from:message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    // var li= jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr('href',message.url);
    // li.append(a);
    
    // jQuery('#messages').append(li);
    scrollToBottom();
});

jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault();

    var messageTextBox= jQuery('[name=message]');

    socket.emit('createMessage',{
        from: 'User',
        text:messageTextBox.val()
    },function(){
        messageTextBox.val('')
    });
});

var locationButton= jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }
    locationButton.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position)=>{
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
        longitude:position.coords.longitude,
        latitude:position.coords.latitude
        },function(){
        alert('Unable to fetch location.');
        });
    });
});