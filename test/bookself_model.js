/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const _ = require('lodash');

const db= require('./bookself_db').bookshelf;


var directory = db.Model.extend({
    tableName: "directorys",

    memberCardObjs: function() {
        return this.hasMany(memberCardModel,'directoryUUID','uuid');
    }

});

var memberCardModel = db.Model.extend({
    tableName: "memberCards",

    directoryObjs: function() {
        return this.belongsTo(directory,'directoryUUID','uuid');
    }
});

var model = {};
model.directory = directory;
model.memberCard = memberCardModel;

exports.model = model;


