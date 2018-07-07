
const amqp = require('amqplib');

const AmqpBaseClient = require('./amqpBaseClient');
let co = require('co');

class AmqpLibRecvClient extends AmqpBaseClient{
    constructor(amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType,queueName) {
        super(amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType);

        this.queueName = queueName;
        this.queueOptions = { durable: true,
            autoDelete: false};

        this.consumerOptions = {noAck: false};
    };

    async createRecver(routingKey,recvFunc,context)
    {
        await  super.checkConn();
        await this.channel.prefetch(1000);

        if(!this.queue)
        {
            this.queue = await this.channel.assertQueue(this.queueName, this.queueOptions);
        }
        await this.channel.bindQueue(this.queue.queue, this.exchageName, routingKey);

        let ctx = this;

        function onRecvMsg(msg) {

            let msgValue = msg.content.toString();

            //console.log("AmqpLibRecvClient->onRecvMsg  routingKey:%s  data:%s", msg.fields.routingKey, msgValue);

            co.wrap(recvFunc).call(context, msgValue)
                .then(function(ret){
                    console.log('amqp msg dispatch  ' + (ret?'success':'failed') + ',msgValue: ' + msgValue);
                    if(ret)
                    {
                        ctx.channel.ack(msg);
                    }
                    else
                    {
                        ctx.channel.nack(msg,false,true);
                    }

                })
                .catch(function(err){
                    console.log('amqp msg dispatch msgValue:' + msgValue+',error:' + err);
                    ctx.channel.nack(msg,false,true);
                });
        }

        await this.channel.consume( this.queue.queue, onRecvMsg, this.consumerOptions );
        return this.queue;
    };

}



module.exports = AmqpLibRecvClient;


/*
let amqpLibRecvClient = new AmqpLibRecvClient('192.168.7.26',5672,'admin','admin','name_msg_logs','direct','queue_msg');
let ctx = {name:'ddd'};
let i = 0;
async function recvData(data) {
   // console.log('recvData data:'+data);

    let context = this;

    if(i%3 ==0)
    {
        i++;
        return true;
    }
    else
    {
        i++;
        return false;
    }
}


amqpLibRecvClient.createRecver('info',recvData,ctx).then(data=>{
        console.log('recv ok data:' + data);
    });
*/










