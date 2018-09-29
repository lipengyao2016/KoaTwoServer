const Eureka = require('eureka-js-client').Eureka;

const utils  =require('common-data-utils').utils;


const client = new Eureka({
    instance: {
        instanceId: /*utils.createUUID()*/ '192.168.7.3_koaTwoServerxx',
        app: 'koaTwoServerxx',
        hostName: '192.168.7.3',
        ipAddr: '192.168.7.3',
        statusPageUrl: 'http://localhost:7000/info/',
        healthCheckUrl: 'http://localhost:7000/health/',
        port: {
            '$': 7001,
            '@enabled': 'true',
        },
        vipAddress: 'koaTwoServerxx',
        dataCenterInfo: {
            '@class':  'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
    },
    eureka: {
        host: 'localhost',
        port: /*32768*/ 8761,
        servicePath: '/eureka/apps/',
        heartbeatInterval:3000,
    },

  /*  eureka: {
        serviceUrls: ['http://192.168.7.6:8761/eureka/apps/'],
    },*/

});

client.start(function(error) {
    if(error){
        console.log('注册Eureka失败');
    }else{
        console.log('服务已成功注册Eureka');

        let hiServicsInsts = client.getInstancesByAppId('HISERVICE');
        console.log('get hiServices hiServicsInsts:' + JSON.stringify(hiServicsInsts,null,2));
    }
});


client.on('started', function(data) {
    console.log('eureka has started,data' + data);
});

client.on('registered', function(chunk) {
    console.log('registered: ' + chunk);
});

client.on('deregistered', function(chunk) {
    console.log('deregistered: ' + chunk);
});

client.on('heartbeat', function(chunk) {
    console.log('heartbeat: ' + chunk);
});

client.on('registryUpdated', function(chunk) {
    console.log('registryUpdated: ' + chunk);
});
