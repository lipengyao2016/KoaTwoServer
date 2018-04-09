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