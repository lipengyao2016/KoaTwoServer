var amqp = require('amqplib');

/*amqp.connect('amqp://admin:admin@192.168.7.26:5672', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var ex = 'direct_logs';
        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || 'Hello World!';
        var severity = (args.length > 0) ? args[0] : 'info';

        ch.assertExchange(ex, 'direct', {durable: true,autoDelete: false});

        ch.assertQueue('libQueue', {}, function(err, q) {
            console.log(' [*] Waiting for logs. To exit press CTRL+C');

            ch.bindQueue(q.queue, ex, severity);
        });

        ch.publish(ex, severity, new Buffer(msg));
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });


});*/

var args = process.argv.slice(2);
var severity = (args.length > 0) ? args[0] : 'info';
var message = args.slice(1).join(' ') || 'Hello World!';

amqp.connect('amqp://admin:admin@192.168.7.26:5672').then(function(conn) {

    conn.on('close',function () {
        console.log('connection closed.');
    });

    conn.on('error',function (err) {
        console.log('connection error err:.' + err);
    });

    conn.on('blocked',function (reason) {
        console.log('connection blocked. reason:' + reason);
    });

    conn.on('unblocked',function () {
        console.log('connection unblocked.');
    });


    return conn.createConfirmChannel().then(function(ch) {

        ch.on('close',function () {
            console.log('channel closed.');
        });

        ch.on('error',function (err) {
            console.log('channel closed error:.' +err);
        });

        ch.on('return',function (msg) {
            console.log('channel return.',msg);
        });

        ch.on('drain',function () {
            console.log('channel drain.');
        });

        var ex = 'direct_logs';
        var ok = ch.assertExchange(ex, 'direct', {durable: false});

        return ok.then(function(curExchange) {

            let i = 0;
            setInterval(function() {

                /*  //exchange.destroy();
                  //queue.destroy();
                  connection.end();
                  connection.destroy();*/

                let messageData = message + ',index=' + i;
                ch.publish(ex, severity, Buffer.from(messageData),{},function(err, ok){
                    if (err !== null) console.warn('Message sendFailed !messageData:%s,',messageData);
                    else console.log('Message send ok !messageData:%s,',messageData);
                });
               // console.log(" [x] Sent %s:'%s'", severity, messageData);

                //console.log("Single queue publish start messageData:" + messageData);

                i++;
            }, 1000);


           // return ch.close();

        });
    })

        //.finally(function() { conn.close(); });
}).catch(console.warn);