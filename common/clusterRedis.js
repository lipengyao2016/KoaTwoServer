/**
 * Copyright(C),
 * FileName:  redis.js
 * Author: sxt
 * Version: 1.0.0
 * Date: 2016/3/30  10:27
 * Description:
 */

"use strict";
var config = require('../config/config');
var Redis = require('ioredis');


var client = new Redis.Cluster(config.redisCluster);


client.on('error', function(err) {
    console.log(err);
});

exports = module.exports = client;