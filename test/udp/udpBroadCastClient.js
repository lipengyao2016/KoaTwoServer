var dgram = require("dgram");

var socket = dgram.createSocket("udp4");
socket.bind(function () {
    socket.setBroadcast(true);
});

var message = new Buffer("Hi");
setInterval(function(){
    socket.send(message, 0, message.length, 5678, '255.255.255.255', function(err, bytes) {
        console.log(`send broadcast msg ok...err:${err},bytes:${bytes}`);
    });
},3000);



// 接收消息
socket.on('message', function (msg,rinfo) {
    console.log(`receive message from ${rinfo.address}:${rinfo.port}：${msg}`);
})