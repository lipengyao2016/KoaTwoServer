/**
 * Created by Administrator on 2016/12/15.
 */
"use strict";
const moment = require('moment');
const utils = require('commonutils').utils;

const  proxyCommon = require('ComponetFramework').proxy_common;
const Proxy =proxyCommon.Proxy;
const _ = require('lodash');

const {directorysDB} = require('../models/tables');
const baseProxy = require('./baseProxy');

const generateQueryCondition = proxyCommon.querySQLGenerator({
    exactKeys : [],
    vagueKeys: ['name','merchantHref','description'],
    inKeys:['id','uuid','merchantUUID','status'],
    DateKeys:['createdAt','modifiedAt']
});


module.exports = baseProxy.getBaseProxy(directorysDB,generateQueryCondition);

