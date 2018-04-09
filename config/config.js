/**
 * Copyright(C),
 * FileName:  config.js
 * Author: sxt
 * Version: 1.0.0
 * Date: 2016/3/30  10:32
 * Description:
 */

"use strict";
const fs = require('fs');
const _ = require('lodash');
const serverConfig = require('../../CommonConfig/serverConfig');

var config = {
    //程序支持NODE的最低版本
    node_low_version : 'v6.2.2',
    //程序支持NODE的最高版本
    node_high_version : 'v7.0.0',
    //debug 为true时，用于本地调试
    debug : true,

    //接口统计开关
    record : false,

/*    //缓存开关控制
    cache : false,
    //缓存失效时间
    cacheTime : 1000,*/

    //服务器配置
    server_domain : serverConfig.server_domain,
    is_sendMessage : false,
    server_port : 8070 ,

    externalServer_domain : serverConfig.ThirdServer_domain,

    //http配置
    is_https : false,

    //JWT
    jwt: {
        secret: '123456',
        private_key : fs.readFileSync(__dirname + '/../ssl/jwt_rsa/jwt_rsa_private_key.pem'),
        public_key : fs.readFileSync(__dirname + '/../ssl/jwt_rsa/jwt_rsa_public_key.pem')
    },

    //knex配置
    knex_client : 'mysql',
    knex_connection : {
        host : /*serverConfig.knex_connection.host*/ '192.168.7.6',
        user : serverConfig.knex_connection.user,
        password : serverConfig.knex_connection.password,
        database : 'userTest',
        port : serverConfig.knex_connection.port,
    },
    knex_pool : {
        min : 0,
        max : 7
    },
    //kafka
    kafkaConfig: {
        zkConnInfo:serverConfig.kafkaConfig.zkConnInfo,
        topic:'bindDeviceSubServiceMsg',
        groupId:'DeviceSubServiceMsgGroup',
        resendMsgTopic:'resendBindDeviceSubServiceMsg',
    },

    //数据库表
    tables : ['memberCardTypes','directorys','memberCards','memberCardServices'
        ,'serviceRecords','bankAccounts','tradeRecords'],


    tableIndexs:
    {
        Tenant_Table : 0,
        PackageDirectory_Table:  1,
        Package_Table : 2,
        PackageBatchs_Table:3,
    },

    //redis配置
    redis: {
        host : serverConfig.redis.host,
        port : serverConfig.redis.port,
        db : serverConfig.redis.db,
        password : serverConfig.redis.password,
    },

    cache : {
        // 缓存开关控制
        open : false,
        // 缓存失效时间,单位s
        time : 60*60,
    },

    //redis配置
/*    redis_host : '192.168.6.17',
    redis_port : 6379,
    redis_db : 1,
    redis_password : '123456',*/

    "errEvent":"errFuncEvent",
    "sucEvent":"successFuncEvent",
    "sendMsgEvent":"sendSmsEvent",
    MaxDataLimit:1000,
    "packageTenantUUID":"94JveWHViaT3frKuutKh7w",
    "deviceTenantUUID":"0VnRpHOEcPpN1CICQ5yTOw",
    "orderDirectoryUUID":"03qayHHFwfq4sIM2IExYRg",

    serverHost:
    {
        CodeGeneratorServerHost:"http://undefined:5020",
        DeviceServerHost:"http://undefined:5024",
        OrderServerHost:"http://undefined:5601",
        CustomerServiceMgrServerHost:"http://undefined:5053",
        DeviceBusiServerHost:"http://undefined:5051",
    }
};

function InitConfig()
{
    _.keys(config.serverHost).map((item)=> {

      /*  if(item == 'CustomerServiceMgrServerHost')
        {
            config.serverHost[item] = config.serverHost[item].replace("undefined","localhost");
        }
        else
        {*/
            config.serverHost[item] = config.serverHost[item].replace("undefined",config.externalServer_domain);
        /*}*/
         console.log(' host:' + config.serverHost[item]);

    });
};

InitConfig();

//console.log('config:',JSON.stringify(config));

if (process.env.server_port) {
    config.server_port = process.env.server_port;
}
if (process.env.server_domain) {
    config.server_domain = process.env.server_domain;
}
if (process.env.knex_client) {
    config.knex_client = process.env.knex_client;
}
if (process.env.knex_host) {
    config.knex_connection.host = process.env.knex_host;
}
if (process.env.knex_port) {
    config.knex_connection.port = process.env.knex_port;
}
if (process.env.knex_user) {
    config.knex_connection.user = process.env.knex_user;
}
if (process.env.knex_password) {
    config.knex_connection.password = process.env.knex_password;
}
if (process.env.knex_database) {
    config.knex_connection.database = process.env.knex_database;
}
if (process.env.knex_pool_min) {
    config.knex_pool.min = process.env.knex_pool_min;
}
if (process.env.knex_pool_max) {
    config.knex_pool.max = process.env.knex_pool_max;
}

module.exports = config;