"use strict";
const fs = require('fs');
const _ = require('lodash');
const serverConfig = require('../../CommonConfig/serverConfig');

var resourceConfig = {
    version : 'v1.0.0',
    resourceMap:[
        {
            resource:'account',
            table:'accounts',
            extend_api: [
                {name:'resetPwd', requestMethod:'GET',interfaceMethod:'resetPwd',type:'object'},
                {name:'countByUserId', requestMethod:'GET',interfaceMethod:'countByUserId',type:'root'},
            ],
        },
        {
            resource:'customer',
            table:'customers',
        },
        {
            resource:'logRecord',
            table:'logRecords',
        },
        {
            resource:'user',
            table:'user',
        },

    ],


};

module.exports = resourceConfig;