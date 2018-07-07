

const amqp = require('amqplib');

class AmqpBaseClient  {
    constructor(amqpServerHost,amqpServerPort,amqpUser,amqpPassword,exchangeName,exchangeType) {
        console.log('ServiceRegister->constructor ' );

        this.amqpServerHost = amqpServerHost;
        this.amqpServerPort = amqpServerPort;
        this.amqpUser = amqpUser;
        this.amqpPassword = amqpPassword;

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
        }

        if(!this.channel)
        {
            this.channel = await this.conn.createConfirmChannel();
        }

        if(!this.exchange)
        {
            this.exchange = await this.channel.assertExchange(this.exchageName, this.exchangeType, this.exchangeOptions);
        }

        return true;
    }


}



module.exports = AmqpBaseClient;