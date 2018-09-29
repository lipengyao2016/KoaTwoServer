
var amqp = require('amqp');

var connection = amqp.createConnection({url: "amqp://admin:admin@192.168.7.26:5672"});

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

connection.on('ready', function () {
    var callbackCalled = false;
   let  exchange = connection.exchange(exchangeName, exchangeOptions);
    connection.queue(queueName,queueOptions, function(queue){
        queue.bind(exchangeName,queueName, function() {
            callbackCalled = true;
            let i = 0;
            setInterval(function() {

              /*  //exchange.destroy();
                //queue.destroy();
                connection.end();
                connection.destroy();*/

                let messageData = 'this is message is testing,index = ' + i;
                exchange.publish(queueName, messageData,{},function (ret) {
                    console.log("Single queue publish ret:" + (ret ? 'failed' : 'success'));
                });

                console.log("Single queue publish start messageData:" + messageData);

                i++;
            }, 1000);

        });

     /*   queue.subscribe(function (message) {
            console.log('At 5 second recieved message is:'+ message.data);
        });*/

    });

});