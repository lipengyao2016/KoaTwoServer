const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const multicastAddr = '224.100.100.100';

server.on('close', () => {
    console.log('socket已关闭');
});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('socket正在监听中...');
    server.addMembership(multicastAddr); // 不写也行
    server.setBroadcast(true);
    server.setMulticastTTL(128);
    setInterval(() => {
        sendMsg();
    }, 1500);
});

server.on('message', (msg, rinfo) => {
    console.log(`receive client message from ${rinfo.address}:${rinfo.port}`);
});

function sendMsg() {
    console.log('sending');
   // server.send('大家好啊，我是服务端广播消息', 8061, '255.255.255.255');
    server.send('大家好啊，我是服务端组播消息', 8061, multicastAddr);
}

server.bind('8060'); // 此处填写IP后无法组播