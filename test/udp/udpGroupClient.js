const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const multicastAddr = '224.100.100.100';

client.on('close', () => {
    console.log('socket已关闭');
});

client.on('error', (err) => {
    console.log(err);
});
client.on('listening', () => {
    console.log('socket正在监听中...');
    client.addMembership(multicastAddr);
});
client.on('message', (msg, rinfo) => {
    console.log(`receive server message from ${rinfo.address}:${rinfo.port}：${msg}`);
});
client.bind(8061); // 此处必须绑定自己的局域网IP或者不填，填localhost是不行的