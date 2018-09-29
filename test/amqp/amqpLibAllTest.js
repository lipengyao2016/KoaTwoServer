const  AmqpLibSendClient= require('./amqpLibSendClient');
const  AmqpLibRecvClient= require('./amqpLibRecvClient');

let amqpLibSendClient = new AmqpLibSendClient('amqpSender','192.168.7.26',5672,'admin','admin','name_msg_logs','direct');


let queueName = /*'queue_msg'*/ 'queue_origin';

let i = 0;
setInterval(function() {

    let message = {name:'lily',index:i};
/*    amqpLibSendClient.sendMsg('info',message).then(data=>{
        console.log('sendmsg ok data:' + data);
    });*/

    amqpLibSendClient.sendMsgToQueue(queueName,message).then(data=>{
        //console.log('sendmsg ok data:' + data);
    });

    i++;
}, 1000);


let amqpLibRecvClient = new AmqpLibRecvClient('amqpRecver','192.168.7.26',5672,'admin','admin','name_msg_logs','direct',queueName);

let ctx = {name:'ddd'};
let j = 0;
async function recvData(data) {
    // console.log('recvData data:'+data);

   // return true;
    let context = this;

    let bRet = false;
    if(j%3 ==0)
    {
        j++;
        bRet = true;
    }
    else
    {
        j++;
        bRet =  false;
    }

  return await  new Promise(function (resolve, reject) {
      setTimeout(function () {
          //console.log('recvData handle ok...');
          resolve(bRet);
      },500)
  })

  //return true;

/*    let message = JSON.parse(data.content.toString());
    if (!message['retryCnt']) {
        message['retryCnt'] = 1;

        amqpLibSendClient.sendMsg('info',message).then(data=>{
            //console.log('resendmsg ok data:' + data);
        });

        return true;
    }
    else if (message['retryCnt'] < 3) {
        message['retryCnt'] = message['retryCnt'] + 1;

        amqpLibSendClient.sendMsg('info',message).then(data=>{
            //console.log('resendmsg ok data:' + data);
        });

        return true;
    }
    else {
        return true;
    }*/



}


amqpLibRecvClient.createRecver(/*'info'*/ '',recvData,ctx).then(data=>{
    console.log('recv ok data:' + data);
});
