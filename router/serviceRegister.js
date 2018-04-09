const Zookeeper = require('./zookeeper');
const zkMode = require('./zkMode').zkMode;


class ServiceRegister  {
    constructor() {
        console.log('ServiceRegister->constructor ' );

        this.root = '/registry';
        this.zookeeper = new Zookeeper({
            connect       : '192.168.7.210:2181',
            root :this.root,
        });


    };

    *registerService(serviceName,serviceAddress)
    {
        let servicePath = this.root + '/' + serviceName;
        let serviceNode =yield* this.zookeeper.createNode(servicePath,'',zkMode.PERSISTENT);
        let providerPath = servicePath + '/' + 'provider';
        let providerNode = yield* this.zookeeper.createNode(providerPath,'',zkMode.PERSISTENT);
        let addressNode = providerPath  + '/' + serviceAddress;
        let serviceAddressNode = yield* this.zookeeper.createNode(addressNode,'',zkMode.PERSISTENT);

        console.log('registerService ok...');

        return true;
    };


}


let register = new ServiceRegister();
module.exports = register;

let co = require('co');
const domain = require('../common/domain');
const domainName = domain.getDomainName();

/*
setTimeout(() => {
    let args = [];
    args.push('MemberCardServer');
    args.push(domainName);

    co.wrap(register.registerService).call(register, 'MemberCardServer',domainName)
        .then(function(data){
            console.log('register service success data:',data);
        })
        .catch(function(err){
            console.log('register service error:' + err);
        });
}, 1000);*/



