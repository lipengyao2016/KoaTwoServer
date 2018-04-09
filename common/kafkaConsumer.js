/**
 * Created by Administrator on 2017/3/7.
 */

const kafka = require('kafka-node');
let co = require('co');


class KafkaConsumer {
    constructor(serverHost, serverPort, consumerName) {

        console.log('KafkaConsumer-->constructor serverHost:' + serverHost
            + ' serverPort:' + serverPort + ' consumerName:' + consumerName);

        this.client = new kafka.Client(`${serverHost}:${serverPort}`, consumerName);


        this.consumerList = [];


    };

    createConsumer(groupName, topicName,onMsgFunc,context) {
        let HighLevelConsumer = kafka.HighLevelConsumer;
        let consumer = new HighLevelConsumer(
            this.client,
            [
                {topic: topicName}
            ],
            {
                groupId: groupName,
                autoCommit: false,
            }
        );
        this.consumerList.push(consumer);

        console.log('init kafka consumer ready!!');

        function commitFunc() {
            consumer.commit(function (err, data) {
                if (err) {
                    console.error('kafka -- commit msg error: ', JSON.stringify(err, null, 2));
                }
                else {
                    console.log('kafka -- commit msg ok, data: ', JSON.stringify(data));
                }
            });
        }


        consumer.on('message', function (message) {
            console.log(message);

            co.wrap(onMsgFunc).call(context, message.value)
                .then(function(data){
                    console.log('msg dispatch  orderMsg success data:',data);
                        commitFunc();

                })
                .catch(function(err){
                    console.log('msg dispatch error:' + err);
                    commitFunc();
                });
        });

        consumer.on('error', function (err) {
            console.error('error:' + err);
        });

        consumer.on('offsetOutOfRange', function (err) {
            console.error('offsetOutOfRange:' + err);
        });

    }

}


module.exports = KafkaConsumer;


