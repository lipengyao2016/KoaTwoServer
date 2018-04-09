/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {payRecordsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','payAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['memberCardHref','settleAmount','orderHref','remark','settleSource'],
    inKeys:['id','uuid','memberCardUUID','orderUUID','status','settleType','payNo'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(payRecordsDB,generateQueryCondition,false,null,null,dateKeys);

