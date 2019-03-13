/**
 * Created by Administrator on 2017/4/14.
 */
const _ = require('lodash')

exports.createObj=function(objClass,params) {

    return _.create(objClass.prototype,params);
}