

const Eureka = require('eureka-js-client').Eureka;
const domain = require('../common/domain');


class EurekaClient  {
    constructor(appName,appIp,appPort,vipName,eurekaServerHost,eurekaServerPort,registryUpdateFunc) {
        console.log('ServiceRegister->constructor ' );

        if(!appIp)
        {
            appIp = domain.getLocalIP();
            console.log('ServiceRegister->constructor getLocal Ip appIp:' + appIp );
        }

        this.appName = appName;
        this.appIp = appIp;
        this.appPort = appPort;
        this.eurekaServerHost = eurekaServerHost;
        this.eurekaServerPort = eurekaServerPort;
        this.registryUpdateFunc = registryUpdateFunc;
        this.vipName = vipName;
        
        this.appDataInfo = `${appName}_${appIp}:${appPort}`;

        this.client = new Eureka({
            instance: {
                instanceId: `${appIp}_${appName}`,
                app: appName,
                hostName: appIp,
                ipAddr: appIp,
              /*  statusPageUrl: 'http://localhost:7000/info/',
                healthCheckUrl: 'http://localhost:7000/health/',*/
                port: {
                    '$': appPort,
                    '@enabled': 'true',
                },
                vipAddress: vipName,
                dataCenterInfo: {
                    '@class':  'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                    name: 'MyOwn',
                },
            },
            eureka: {
                host: eurekaServerHost,
                port: eurekaServerPort,
                servicePath: '/eureka/apps/',
                //heartbeatInterval:30000,
            },
            /*  eureka: {
                  serviceUrls: ['http://192.168.7.6:8761/eureka/apps/'],
              },*/
        });

        let ctx = this;

        ctx.client.on('started', function(data) {
            console.log('eureka has started,data' + data);
        });

        ctx.client.on('registered', function(data) {
            console.log('registered: ' + data);
        });

        ctx.client.on('deregistered', function(data) {
            console.log('deregistered: ' + data);
        });

        ctx.client.on('heartbeat', function(data) {
            console.log('heartbeat: ' + data);
        });


        ctx.client.on('registryUpdated', function(data) {
            console.log('registryUpdated: ' + data);
            if(registryUpdateFunc)
            {
                registryUpdateFunc.call(null,ctx);
            }
        });

    };

    async registerService()
    {
        let ctx = this;
        return  await  new Promise(function (resolve, reject) {
            ctx.client.start(function(error) {
                if(error){
                    console.error('register Eureka failed,appDataInfo: ' + ctx.appDataInfo);
                    reject(error);
                }else{
                    console.log('register Eureka success,appDataInfo: ' + ctx.appDataInfo);
                    resolve(ctx.appDataInfo);
                }
            });
        })
    };

    async unRegisterService()
    {
        let ctx = this;
        return  await  new Promise(function (resolve, reject) {
            ctx.client.stop(function(error,data) {
                if(error){
                    console.error('unRegister Eureka failed,error: ' + error);
                    reject(error);
                }else{
                    console.log('unRegister Eureka success,data: ' + data);
                    resolve(data);
                }
            });
        })
    };

    getInstancesByAppId(appId)
    {
        let hiServicsInsts = this.client.getInstancesByAppId(appId);

        let retInstances = hiServicsInsts.map(inst=>{
            return {
                app:inst.app,
                instanceId:inst.instanceId,
                host:inst.ipAddr,
                port:inst.port.$,
            };
        });

        console.log('getInstancesByAppId retInstances:' + JSON.stringify(retInstances,null,2));
        return retInstances;
    }


    getInstancesByVip(vip)
    {
        let hiServicsInsts = this.client.getInstancesByVipAddress(vip);

        let retInstances = hiServicsInsts.map(inst=>{
            return {
                app:inst.app,
                instanceId:inst.instanceId,
                host:inst.ipAddr,
                port:inst.port.$,
            };
        });

        console.log('getInstancesByVip retInstances:' + JSON.stringify(retInstances,null,2));
        return hiServicsInsts;
    }

}



module.exports = EurekaClient;

let co = require('co');
function getRegisterData(enurekaClient) {
   let hiRet =  enurekaClient.getInstancesByAppId('HISERVICE');

   //console.log('getRegisterData hiRet:' + JSON.stringify(hiRet,null,2));

   let koaRet =  enurekaClient.getInstancesByVip('KOATWOSERVERXX');

    //console.log('getRegisterData koaRet:' + JSON.stringify(koaRet,null,2));
}

let koaTwoEurekaClient = new EurekaClient('koaTwoServerxx',null,'7001','kaotwo-server','192.168.7.26',8761,getRegisterData);

koaTwoEurekaClient.registerService().then(data=>{
    console.log('register data:' + data);

    setTimeout(() => {
      koaTwoEurekaClient.unRegisterService().then(data=>{
         console.log('unregister data:' + data);
      });
    }, 1000);

});







