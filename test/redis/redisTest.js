const clusterRedis = require('../../common/clusterRedis');

/*
clusterRedis.publish('news', 'Hello world!').then(data=>{
    console.log('publish ok');
})

*/

let msgData={
    "deviceId":"9120151017",
    "order":"201901260017",
    "status":6,    // 3:deliveryCmdSent,4:deliveryCmdRecv,5:deviceOffline,6:deliveryEnd

    "data": [
        {
            "slot": 1,     // 货道号
            "status": "0",   // 0: 成功；其它失败
            "errMsg": "",
            "detail": {
                "switchStatus": 1, // 限位开 关状态  0x01 表示出货结束； 0x0F 表示出货超时，触发开关接触不好，或者触发开关发生故障；
                "dileveryStatus": 15 // 掉货状态 0x01:缺货，0x0f：不缺货，0x00：功能关闭；
            }
        }
    ],

    "extra": {
        "liftStatus": 1 // 升降台 状态 0x01:正常，0x0f：异常，0x00：功能关闭；
    }
};

clusterRedis.lpush('vendorOrderMsgMQ', JSON.stringify(/*{data:'sendGoods_' + i}*/ msgData), function(err, reply){
    if(err){
        console.log('lpush message error :' + err);
    }else{
        console.log('lpush message success:' );
    }
});


/*

let i = 0;
setInterval(function () {

    clusterRedis.lpush('vendorOrderMsgMQ', JSON.stringify(/!*{data:'sendGoods_' + i}*!/ msgData), function(err, reply){
        if(err){
            console.log('lpush message error :' + err);
        }else{
            console.log('lpush message success:' + i);
        }
    });

    i++;


},1000);
*/
