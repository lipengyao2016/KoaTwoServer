const  AmqpLibSendClient= require('./amqpLibSendClient');
const  AmqpLibRecvClient= require('./amqpLibRecvClient');

let exchangeName = 'exchange_delay';
let queueName = /*'queue_msg'*/ 'queue_delay';

let routeKey = 'info';

let amqpLibSendClient = new AmqpLibSendClient('amqpSender','192.168.7.26',5672,'admin','admin',exchangeName,'direct');

let i = 0;
setTimeout(function() {

    let message = {name:'delayMsg',index:i};
    amqpLibSendClient.sendMsg(routeKey,message,'6000').then(data=>{
        console.log('sendmsg ok data:' + data);
    });

    i++;
}, 1000);



/*
let amqpLibRecvClient = new AmqpLibRecvClient('amqpRecver','192.168.7.26',5672,'admin','admin',exchangeName,'direct',queueName,
    'exchange_dlx_delay','dlx_info');

let ctx = {name:'ddd'};
async function recvData(data) {
    // console.log('recvData data:'+data);

   // return true;
    let context = this;


  return await  new Promise(function (resolve, reject) {
      setTimeout(function () {
          //console.log('recvData handle ok...');
          resolve(bRet);
      },500)
  })

}


amqpLibRecvClient.createRecver(routeKey,recvData,ctx).then(data=>{
    console.log('recv ok data:' + data);
});
*/

