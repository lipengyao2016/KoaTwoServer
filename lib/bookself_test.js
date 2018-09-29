'use strict';

/**
 * Created by Administrator on 2016/9/25.
 */
const common = require('./common');
const utils = require('common-data-utils').utils;
const request = common.request;
const url = common.url;
const _ = require('lodash');

const model = require('./bookself_model').model;

//find
/*model.directory.forge().fetchAll().then(function(directory){

    let data = directory.models.map(item=>item.attributes);

    console.log(data);
});*/

/*model.directory.forge({uuid:'Erbk6T8mhZEwYGuzalDfvw'}).fetch().then(function(directory){
    console.log(directory.attributes);
});*/

//insert
/*
 model.directory.forge({
     uuid:utils.createUUID(),
     name:'lisixxx',
     merchantHref:'http://localhost:5006/api/v1.0.0/merchants/zQZNqVpEbFxyZ7ayW7x2yA',
     merchantUUID:'zQZNqVpEbFxyZ7ayW7x2yA',
     status:'enabled',
     description:'data',
     createdAt:utils.getTimeStr(new Date(),true),
     modifiedAt:utils.getTimeStr(new Date(),true),
 }).save().then(function(model){
    console.log(model.attributes)
 }).catch(function(err){
     console.error(err)
 });*/

//update
/*model.directory.forge().where('uuid','=','e4ZlzHOrd9O4ckZvSV8GkA')
    .save({
    name:'lisixxx',
    merchantHref:'http://localhost:5006/api/v1.0.0/merchants/zQZNqVpEbFxyZ7ayW7x2yA',
    merchantUUID:'zQZNqVpEbFxyZ7ayW7x2yA',
},{patch: true}).then(function(model){
    console.log(model.attributes)
}).catch(function(err){
    console.error(err)
});*/

//delete
/*
model.directory.forge().where('uuid','=','Erbk6T8mhZEwYGuzalDfvw')
    .destroy().then(function(model){
    console.log(model)
}).catch(function(err){
    console.error(err)
});*/

model.directory.forge({ uuid: 'e4ZlzHOrd9O4ckZvSV8GkA' }).fetch({ withRelated: ['memberCardObjs'] }).then(function (directData) {
    /* model.directory/!*.where('uuid','=','e4ZlzHOrd9O4ckZvSV8GkA')*!/.fetchPage({
         limit: 3,
          offset: 0,
         withRelated: ['memberCardObjs']}).then(function(directData){*/

    /*  let directorObjs = model.attributes;
      let memberCardObjs = model.relations.memberCardObjs.models.map(singleData=>singleData.attributes);
      directorObjs.memberCards = memberCardObjs;*/
    // console.log(model);
    let directorObjs = directData.toJSON({ 'shallow': false });
    console.log(JSON.stringify(directorObjs, null, 2));

    let t2 = directData.related('memberCardObjs');

    //console.log(JSON.stringify(t2.relatedData,null,2));

    console.log(t2.toJSON());
}).catch(function (err) {
    console.error(err);
});

/*
model.memberCard.where('uuid','=','y7v4S1lEvQg42v2eExlHcQ').fetch({withRelated: ['directoryObjs']}).then(function(model){

let memberCardObjs = model.attributes;
let directoryObjs = model.relations.directoryObjs.attributes;
memberCardObjs.directory = directoryObjs;

console.log(memberCardObjs);
}).catch(function(err){
    console.error(err)
});*/