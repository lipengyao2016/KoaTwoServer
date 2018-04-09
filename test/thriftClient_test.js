/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const _ = require('lodash');

var thrift = require('thrift');

var UserService = require('./gen-nodejs/UserService.js'),
    ttypes = require('./gen-nodejs/user_types');


let conn = thrift.createConnection('127.0.0.1', 7911);
let client = thrift.createClient(UserService, conn);

var user = new ttypes.User({uid: '10',
    uname: "Mark Slee",
    uage: 20,
    usex:true,
});



client.add(user, function (err,resonse) {
    console.log(resonse);

    client.get('10',function (err,response) {
        let resUser = response;
        console.log(JSON.stringify(resUser));
    })

});



// null 'Hello Thrift'
