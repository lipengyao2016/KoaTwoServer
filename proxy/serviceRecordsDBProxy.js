/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {serviceRecordsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','recordAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['tradeValue','leftValue','operator','recordSource'],
    inKeys:['id','uuid','memberCardUUID','serviceUUID','recordType'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(serviceRecordsDB,generateQueryCondition,false,null,null,dateKeys);

