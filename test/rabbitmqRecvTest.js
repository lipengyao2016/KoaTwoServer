
var amqp = require('amqp');

var connection = amqp.createConnection({url: "amqp://admin:admin@192.168.7.26:5672"});

var bStop = false;

let exchangeName = 'exchange_ack';
let queueName = 'queue_ack';
let exchangeOptions = {
    type: 'direct',
    autoDelete:false,
    durable: true,
    confirm: true
};
let queueOptions = {
    autoDelete:false,
    durable:true,
};

let subscribeOptions = {
    ack: true,
    prefetchCount: 1,
    routingKeyInPayload:true,
    deliveryKeyInPayload:true
};

connection.on('ready', function () {
    connection.queue(queueName, queueOptions, function (queue) {
        console.log('Queue ' + queue.name + ' is open!');
        //queue.bind("topic","topic");
        queue.subscribe(function (message, header, deliveryInfo,messageObject) {
            let buf = deliveryInfo.deliveryTag.slice(4,8);
            let deliveryTag = buf.readUInt32BE(0);
            console.log('recv msg data : ' + message.data.toString() + ',routingKey:' + deliveryInfo.routingKey
            +',deliveryKey:' + deliveryTag);

        });

    });
});