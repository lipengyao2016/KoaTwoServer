const amqp = require('amqplib');

const AmqpBaseClient = require('./amqpBaseClient');
let co = require('co');
const _ = require('lodash');

class AmqpLibRecvClient extends AmqpBaseClient {
    constructor(clientName,amqpServerHost, amqpServerPort, amqpUser, amqpPassword, exchangeName, exchangeType, queueName,
                dlxExchangeName,dlxExchangeRoutingKey) {
        super(clientName,amqpServerHost, amqpServerPort, amqpUser, amqpPassword, exchangeName, exchangeType);

        this.queueName = queueName;
        this.queueOptions = {
            durable: true,
            autoDelete: false
        };

        if(!_.isEmpty(dlxExchangeName) && !_.isEmpty(dlxExchangeRoutingKey))
        {
            this.queueOptions = _.extend(this.queueOptions, {
                deadLetterExchange:dlxExchangeName,
                deadLetterRoutingKey:dlxExchangeRoutingKey,
            });
        }

        this.consumerOptions = {noAck: false};
    };

    async createRecver(routingKey, recvFunc, context) {
        await  super.checkConn();
        await this.channel.prefetch(1000);

        if (!this.queue) {
            this.queue = await this.channel.assertQueue(this.queueName, this.queueOptions);
        }

        if(!_.isEmpty(routingKey))
        {
            console.log('AmqpLibRecvClient->createRecver bind routekey to queue routingKey:' + routingKey);
            await this.channel.bindQueue(this.queue.queue, this.exchageName, routingKey);
        }

        let ctx = this;

        function onRecvMsg(msg) {

            let msgValue = msg.content.toString();

            //console.log("AmqpLibRecvClient->onRecvMsg  routingKey:%s  data:%s", msg.fields.routingKey, msgValue);

            co.wrap(recvFunc).call(context, msg)
                .then(function (ret) {
                    console.log('AmqpLibRecvClient recv msg dispatch  ' + (ret ? 'success' : 'failed') + ',msgValue: ' + msgValue);
                    if (ret) {
                        ctx.channel.ack(msg);
                    }
                    else {
                        ctx.channel.nack(msg, false, true);
                    }

                })
                .catch(function (err) {
                    console.log('AmqpLibRecvClient recv msg dispatch msgValue:' + msgValue + ',error:' + err);
                    ctx.channel.nack(msg, false, true);
                });
        }

        await this.channel.consume(this.queue.queue, onRecvMsg, this.consumerOptions);
        return this.queue;
    };

}


module.exports = AmqpLibRecvClient;


/*
let amqpLibRecvClient = new AmqpLibRecvClient('amqpRecver','192.168.7.26', 5672, 'admin', 'admin', 'name_msg_logs', 'direct', 'queue_msg');
let ctx = {name: 'ddd'};
let i = 0;

async function recvData(data) {
    // console.log('recvData data:'+data);



/!*    let context = this;
    if(j%3 ==0)
    {
        j++;
        return true;
    }
    else
    {
        j++;
        return false;
    }*!/

/!*    let message = JSON.parse(data.content.toString());
    if (!message['retryCnt']) {
        message['retryCnt'] = 1;
        return false;
    }
    else if (message['retryCnt'] <= 3) {
        message['retryCnt'] = message['retryCnt'] + 1;
        return false;
    }
    else {
        return true;
    }
    data.content = Buffer.from(JSON.stringify(message));*!/


}


amqpLibRecvClient.createRecver('info', recvData, ctx).then(data => {
    console.log('recv ok data:' + data);
});

*/









