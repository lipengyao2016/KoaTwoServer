/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {memberCardServicesDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','beginAt','endAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['serviceHref','serviceName','buyServiceValue','consumeredServiceValue','source'],
    inKeys:['id','uuid','memberCardUUID','serviceUUID','status','serviceType'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(memberCardServicesDB,generateQueryCondition,false,null,null,dateKeys);

