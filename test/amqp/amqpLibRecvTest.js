var amqp = require('amqplib');

var args = ['info'];

/*
if (args.length == 0) {
    console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
    process.exit(1);
}

amqp.connect('amqp://admin:admin@192.168.7.26:5672', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'direct_logs';

        ch.assertExchange(ex, 'direct', {durable: false});

        ch.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            args.forEach(function(severity) {
                ch.bindQueue(q.queue, ex, severity);
            });

            ch.consume(q.queue, function(msg) {
                console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            }, {noAck: true});
        });
    });
});*/


var basename = require('path').basename;

var severities = args;
if (severities.length < 1) {
    console.warn('Usage: %s [info] [warning] [error]',
        basename(process.argv[1]));
    process.exit(1);
}

let queueName = 'queue_msg';

let i = 0;

amqp.connect('amqp://admin:admin@192.168.7.26:5672').then(function (conn) {
    process.once('SIGINT', function () {
        conn.close();
    });
    return conn.createChannel().then(function (ch) {
        var ex = 'name_msg_logs';

        var ok = ch.assertExchange(ex, 'direct', { durable: true,
            autoDelete: false});

        ok.then(function () {

            ch.prefetch(10);

            return ch.assertQueue(queueName, { durable: true,
                autoDelete: false});
        }).then(function (qok) {
            var queue = qok.queue;
            return Promise.all(severities.map(function (sev) {
                ch.bindQueue(queue, ex, sev);
            })).then(function () {
                    return queue;
                }
            );
        }).then(function (queue) {
            return ch.consume(queue, logMessage, {noAck: false});
        }).then(function () {
            console.log(' [*] Waiting for logs. To exit press CTRL+C.');
        });

        function logMessage(msg) {
            console.log(" [x] %s:'%s'",
                msg.fields.routingKey,
                msg.content.toString());

            if(i%3 == 0)
            {
                ch.ack(msg);
            }
            else
            {
                ch.nack(msg,false,true);
            }


            i++;
        }


    });
}).catch(console.warn);
