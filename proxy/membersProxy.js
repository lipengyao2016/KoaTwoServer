/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {membersDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

let dateKeys = ['createdAt','modifiedAt','registerAt'];

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['name','description'],
    inKeys:['id','uuid','directoryUUID','cardNo','status'],
    DateKeys:dateKeys,
});



module.exports = baseProxy.getBaseProxy(membersDB,generateQueryCondition,false,null,null,dateKeys);

