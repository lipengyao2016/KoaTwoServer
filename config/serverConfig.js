/**
 * Copyright(C),
 * FileName:  config.js
 * Author: sxt
 * Version: 1.0.0
 * Date: 2016/3/30  10:32
 * Description:
 */

"use strict";
var serverConfig = {
 
    //服务器配置
    server_domain : 'localhost',
	
	//文件服务器路径
	fileServer_domain : '192.168.7.210',

    ThirdServer_domain : '192.168.7.210',

    knex_connection : {
        host : '192.168.7.210',
        user : 'root',
        password : '123456',
        port : 3306
    },
   
    //redis配置
    redis: {
        host : '192.168.7.210',
        port : 6379,
        db : 0,
        password : ''
    },
    
         //kafka
    kafkaConfig: {
        zkConnInfo: '192.168.7.166:2181',
       // port: '2181'
    },

 
};

module.exports = serverConfig;