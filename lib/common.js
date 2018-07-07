/**
 * Copyright(C),
 * FileName:  common.js
 * Author: sxt
 * Version: 1.0.0
 * Date: 2016/3/25  13:56
 * Description:
 */
"use strict";
//var fs = require('fs');

const config = require('../config/config');
const request = require('commonutils').request.request;

let options = {
    host: config.server_domain,
    port: config.server_port,
    path: '/',
    auth: 'mGldhwkSw8MtDFLhbk1i4Q:mGldhwkSw8MtDFLhbk1i4Q',
    //key: fs.readFileSync(__dirname+'/clientSSLkey/client-key.pem'),
    //cert: fs.readFileSync(__dirname+'/clientSSLkey/client-cert.pem'),
    rejectUnauthorized: false,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
};
exports.url = `http://${options.host}:${options.port}/api/v1`;

exports.request = request;