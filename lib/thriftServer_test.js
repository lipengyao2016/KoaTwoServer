'use strict';

/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('common-data-utils').utils;
const request = common.request;
const url = common.url;
const _ = require('lodash');

var thrift = require('thrift');

var UserService = require('./gen-nodejs/UserService.js'),
    ttypes = require('./gen-nodejs/user_types');

var users = {};

var server = thrift.createServer(UserService, {

    add: function (user, result) {
        console.log("server stored:", user.uname);
        users[user.uid] = user;
        result(null, 'server data');
    },

    get: function (uid, result) {
        console.log("server get uid:", uid);
        let user = users[uid];
        result(null, user);
    }

});

server.listen(7911);
console.log('server start');