/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('commonutils').utils;
const request = common.request;
const url = common.url;
const _ = require('lodash');

const db= require('./bookself_db').bookshelf;


var directoryModel = db.Model.extend({
    tableName: "directorys",
    idAttribute: 'uuid',

    memberCardObjs: function() {
        return this.hasMany(memberCardModel,'directoryUUID','uuid');
    }

});

var memberCardModel = db.Model.extend({
    tableName: "memberCards",
    idAttribute: 'uuid',

    directoryObjs: function() {
        return this.belongsTo(directoryModel,'directoryUUID','uuid');
    }
});

let memberCardInstand = memberCardModel.forge();

let memberCardDirec = memberCardInstand.related('directoryObjs');
console.log(JSON.stringify(memberCardDirec.relatedData,null,2))

var model = {};
model.directory = directoryModel;
model.memberCard = memberCardModel;

exports.model = model;



