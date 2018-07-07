
const amqp = require('amqplib');

const AmqpBaseClient = require('./amqpBaseClient');

class AmqpLibSendClient extends  AmqpBaseClient {
    constructor(amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType) {
        super(amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType);
    };



    async sendMsg(routingKey,msg)
    {
        await  super.checkConn();

        let ctx = this;

        return await  new Promise(function (resolve, reject) {
            let msgValue = JSON.stringify(msg);
            ctx.channel.publish(ctx.exchageName, routingKey, Buffer.from(msgValue),{},function(err, ok){
                if (err !== null)
                {
                    console.warn('AmqpLibSendClient->sendMsg sendFailed !msg:%s,',msgValue);
                    reject(err);
                }
                else
                {
                    console.log('AmqpLibSendClient->sendMsg send ok !msg:%s,',msgValue);
                    resolve('ok');
                }
            });

        })
    };

}



module.exports = AmqpLibSendClient;


/*let amqpLibSendClient = new AmqpLibSendClient('192.168.7.26',5672,'admin','admin','name_msg_logs','direct');

let i = 0;
setInterval(function() {

    let message = {name:'lily',index:i};
    amqpLibSendClient.sendMsg('info',message).then(data=>{
        console.log('sendmsg ok data:' + data);
    });

    i++;
}, 1000);*/








