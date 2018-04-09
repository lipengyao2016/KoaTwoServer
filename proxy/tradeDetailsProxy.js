/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {tradeDetailsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','tradeAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['tradeNo','tradeSource',
        'tradeAmount','remark'],
    inKeys:['id','uuid','objectUUID','tradeType','status'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(tradeDetailsDB,generateQueryCondition,false,null,null,dateKeys);

