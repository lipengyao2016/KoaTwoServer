const apoll = require('node-apollo');

const utils  =require('common-data-utils').utils;


// 携程apollo配置中心配置
const common_config = {
    configServerUrl: 'http://localhost:8080/',
    appId: 'CommonConfig',
    clusterName: 'default',
    namespaceName: 'application',
    apolloEnv: 'dev',
};

// 读取携程apollo配置中心，并创建default.env文件
apoll.remoteConfigServiceFromCache(common_config)
    .then((data =>
    {
       // apollo.createEnvFile(data);
        console.log('get CommonConfig data:' + JSON.stringify(data,null,2));

    }))
    .catch(err => {
        console.error(err);
    });


// 携程apollo配置中心配置
const koatwo_config = {
    configServerUrl: 'http://localhost:8080/',
    appId: 'KaoTwoServer',
    clusterName: 'default',
    namespaceName: ['application','TEST1.Common'],
    apolloEnv: 'dev',
};

apoll.remoteConfigServiceFromCache(koatwo_config)
    .then((data =>
    {
        // apollo.createEnvFile(data);
        console.log('get koatwo_config data:' + JSON.stringify(data,null,2));

    }))
    .catch(err => {
        console.error(err);
    });