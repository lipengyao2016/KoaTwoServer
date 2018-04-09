/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {tradeRecordsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','tradeAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['tradeAmount','balanceAmount','operator','tradeNo'],
    inKeys:['id','uuid','accountUUID','tradeType','status'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(tradeRecordsDB,generateQueryCondition,false,null,null,dateKeys);

