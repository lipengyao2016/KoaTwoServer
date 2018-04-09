const Zookeeper = require('./zookeeper');
const zkMode = require('./zkMode').zkMode;


class ClientDiscovery  {
    constructor() {
        console.log('ServiceRegister->constructor ' );

        this.root = '/registry';
        this.zookeeper = new Zookeeper({
            connect       : '192.168.7.210:2181',
            root :this.root,
        });


    };

    *findService(serviceName)
    {
        let servicePath = this.root + '/' + serviceName;
        let providerPath = servicePath + '/' + 'provider';

        let serviceAddressNode = yield* this.zookeeper.getChild(providerPath);

        console.log('findService serviceName:'+ serviceName + ',serviceAddressNode:' + JSON.stringify(serviceAddressNode));

        return serviceAddressNode;
    };


}


let clientDiscovery = new ClientDiscovery();
module.exports = clientDiscovery;

let co = require('co');


setTimeout(() => {
    let args = [];
    args.push('MemberCardServer');

    co.wrap(clientDiscovery.findService).call(clientDiscovery, 'MemberCardServer')
        .then(function(data){
            console.log('discovery service success data:',data);
        })
        .catch(function(err){
            console.log('discovery service error:' + err);
        });
}, 1000);



