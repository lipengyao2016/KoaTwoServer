/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {tradeObjectsDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['goodsHref','quatity','orignAmount',
        'tradeAmount','remark'],
    inKeys:['id','uuid','goodsUUID','tradeOrderUUID','status'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(tradeObjectsDB,generateQueryCondition,false,null,null,dateKeys);

