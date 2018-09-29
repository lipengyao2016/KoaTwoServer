

const amqp = require('amqplib');

class AmqpBaseClient  {
    constructor(clientName,amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType) {
        console.log('ServiceRegister->constructor ' );

        this.amqpServerHost = amqpServerHost;
        this.amqpServerPort = amqpServerPort;
        this.amqpUser = amqpUser;
        this.amqpPassword = amqpPassword;

        this.clientName = clientName;

        this.amqpUrl = `amqp://${this.amqpUser}:${this.amqpPassword}@${this.amqpServerHost}:${this.amqpServerPort}`;

        this.conn = null;
        this.channel = null;
        this.exchange = null;
        this.queue = null;

        this.exchageName = exchangeName;
        this.exchangeType = exchangeType;  //'direct'
        this.exchangeOptions = {
            durable: true,
            autoDelete: false,
        };

        let ctx = this;

        /*  ctx.client.on('started', function(data) {
              console.log('eureka has started,data' + data);
          });*/

    };

    async checkConn()
    {
        if(!this.conn)
        {
            this.conn = await amqp.connect(this.amqpUrl);
            this.conn.on('error', function(err) {
                console.log(`amqp base connection error client:${this.clientName} err:${err}` );
            });
        }

        if(!this.channel)
        {
            this.channel = await this.conn.createConfirmChannel();
            this.channel.on('error', function(err) {
                console.log(`amqp base channel error client:${this.clientName} err:${err}` );
            });

            this.channel.on('return', function(msg) {
                console.log(`amqp base channel client:${this.clientName} return not route msg  msg:${msg.content.toString()}` );
            });
        }

        if(!this.exchange)
        {
            this.exchange = await this.channel.assertExchange(this.exchageName, this.exchangeType, this.exchangeOptions);
          //  this.exchange = await this.channel.checkExchange(this.exchageName);
        }

        return true;
    }


}



module.exports = AmqpBaseClient;