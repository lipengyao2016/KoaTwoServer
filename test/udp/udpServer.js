var dgram = require('dgram');
//创建 udp server
var udp_server = dgram.createSocket('udp4');
udp_server.bind(5678); // 绑定端口

// 监听端口
udp_server.on('listening', function () {
    console.log('udp server linstening 5678.');
})

//接收消息
udp_server.on('message', function (msg, rinfo) {
    strmsg = 'I,m server reply data:' + msg.toString();
    udp_server.send(strmsg, 0, strmsg.length, rinfo.port, rinfo.address); //将接收到的消息返回给客户端
    console.log(`udp server received data: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`)
})
//错误处理
udp_server.on('error', function (err) {
    console.log('some error on udp server.')
    udp_server.close();
})