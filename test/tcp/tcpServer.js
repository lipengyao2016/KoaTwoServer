var net = require('net');

const PORT = 18001;
const HOST = '127.0.0.1';


var clientHandler = function(socket){

    //客户端发送数据的时候触发data事件
    socket.on('data', function dataHandler(data) {

        //data是客户端发送给服务器的数据
        console.log(socket.remoteAddress, socket.remotePort, 'send', data.toString());
        //服务器向客户端发送消息
        socket.write('server received\n');
    });

    //当对方的连接断开以后的事件
    socket.on('close', function(){
        console.log(socket.remoteAddress, socket.remotePort, 'disconnected');
    });

    socket.on('end', function(){
        console.log(socket.remoteAddress, socket.remotePort, 'end');
    });

    socket.on('error', function(){
        console.log(socket.remoteAddress, socket.remotePort, 'error');
    });

};

//创建TCP服务器的实例
//传入的参数是：监听函数clientHandler
var app = net.createServer(clientHandler);
app.listen(PORT, HOST,function(){
    console.log('listen success.');
    console.log('tcp server running on tcp://', HOST, ':', PORT,app.maxConnections);
});



