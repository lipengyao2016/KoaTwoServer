/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {tradeOrdersDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','tradeAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['sellOrderHref','merberCardHref','isUseMemberCard',
        'tradeNumber','tradeAmount','tradeAddress','operator','remark'],
    inKeys:['id','uuid','memberCardUUID','sellOrderUUID','status'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(tradeOrdersDB,generateQueryCondition,false,null,null,dateKeys);

