
const amqp = require('amqplib');

const AmqpBaseClient = require('./amqpBaseClient');

class AmqpLibSendClient extends  AmqpBaseClient {
    constructor(clientName,amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType) {
        super(clientName,amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType);
    };



    async sendMsg(routingKey,msg,expirationTime)
    {
        await  super.checkConn();
        let ctx = this;
        return await  new Promise(function (resolve, reject) {
            let msgValue = JSON.stringify(msg);
            ctx.channel.publish(ctx.exchageName, routingKey, Buffer.from(msgValue),{mandatory:true
                ,expiration:expirationTime},function(err, ok){
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

    async sendMsgToQueue(queueName,msg)
    {
        await  super.checkConn();

        if (!this.queue) {
            let queueOptions = {
                durable: true,
                autoDelete: false
            };
            this.queue = await this.channel.assertQueue(queueName, queueOptions);

        }

        let ctx = this;
        return await  new Promise(function (resolve, reject) {
            let msgValue = JSON.stringify(msg);
            ctx.channel.sendToQueue(queueName, Buffer.from(msgValue),{mandatory:true},function(err, ok){
                if (err !== null)
                {
                    console.warn('AmqpLibSendClient->sendMsgToQueue sendFailed !msg:%s,',msgValue);
                    reject(err);
                }
                else
                {
                    console.log('AmqpLibSendClient->sendMsgToQueue send ok !msg:%s,',msgValue);
                    resolve('ok');
                }
            });

        })
    };



}



module.exports = AmqpLibSendClient;

/*

let amqpLibSendClient = new AmqpLibSendClient('amqpSender','192.168.7.26',5672,'admin','admin','name_msg_logs','direct');

let i = 0;
setTimeout(function() {

    let message = {name:'lily',index:i};
    amqpLibSendClient.sendMsg('info',message).then(data=>{
        console.log('sendmsg ok data:' + data);
    });

    i++;
}, 1000);
*/








