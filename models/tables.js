/**
 * Created by Administrator on 2016/9/12.
 */
"use strict";
const knex = require('./knex').knex;
//const cache = require('../common/cacheAble');
const config = require('../config/config');
const Table = require('ComponetFramework').tables.baseTable;

/*class Table {
    constructor(name){
        this.name = name;
    };

    create(info) { return knex(this.name).insert(info);};
    retrieve(uuid) {return knex(this.name).select().where('uuid', uuid);};
    update(info) {return knex(this.name).update(info).where('uuid', info.uuid);};
    delete(uuid) {
        return knex(this.name).delete().where('uuid', uuid);
    };
    query(queryStr, offset, limit, retRaw = '*', orderBy = undefined) {
        if (orderBy) {
            return knex(this.name).select(retRaw).whereRaw(queryStr).offset(offset).limit(limit).orderByRaw(orderBy);
        } else {
            return knex(this.name).select(retRaw).whereRaw(queryStr).offset(offset).limit(limit);
        }
    };
    queryBy(queryStr,retRaw='*') { return knex(this.name).select(retRaw).whereRaw(queryStr);};
    getCount(queryStr) {return knex(this.name).whereRaw(queryStr).count('uuid as count').then(results => results[0].count);}
}*/

//const tableNames = ['users','departments', 'organizations'];
const  tableNames =/* config.tables*/ ['accounts','user'];

tableNames.map((name)=>{
    exports[name+'DB']=new Table(name,knex);
});




