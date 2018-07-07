const  AmqpLibSendClient= require('./amqpLibSendClient');
const  AmqpLibRecvClient= require('./amqpLibRecvClient');

let amqpLibSendClient = new AmqpLibSendClient('192.168.7.26',5672,'admin','admin','name_msg_logs','direct');

let i = 0;
setInterval(function() {

    let message = {name:'lily',index:i};
    amqpLibSendClient.sendMsg('info',message).then(data=>{
        console.log('sendmsg ok data:' + data);
    });

    i++;
}, 1000);


let amqpLibRecvClient = new AmqpLibRecvClient('192.168.7.26',5672,'admin','admin','name_msg_logs','direct','queue_msg');

let ctx = {name:'ddd'};
let j = 0;
async function recvData(data) {
    // console.log('recvData data:'+data);

    let context = this;
    if(j%3 ==0)
    {
        j++;
        return true;
    }
    else
    {
        j++;
        return false;
    }
}


amqpLibRecvClient.createRecver('info',recvData,ctx).then(data=>{
    console.log('recv ok data:' + data);
});
