/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('../common');
const utils = require('common-data-utils').utils;
const request = common.request;
const url = common.url;
const _ = require('lodash');


var knex = require('knex'),
    db;    // 数据库连接

// 数据库连接配置
var config = {
    client: 'mysql',        // 其他可以是pg、sqlite3
    connection: {
        host:'127.0.0.1',
        user:'root',
        password:'123456',
        database:'MemberCardServerDB', // 数据库名称
    }
};

// 保证数据库连接只初始化一次。
if (!db) {
    db = knex(config);
}
var bookshelf = require('bookshelf')(db);
bookshelf.plugin('pagination');
exports.bookshelf = bookshelf;