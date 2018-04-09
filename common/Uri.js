/**
 * Created by licp on 2016-08-18.
 */

var domainName = require('./URIReg');
const resourceURI = require('../controllers/resourceURI');
const URIParser = resourceURI.v1;

//listAccountsURI
exports.listAccountsURI = function() {
    return domainName.host + '/accounts';
}

exports.listMenusURI = function() {
    return domainName.host + '/menus';
}

exports.listMenuGroupsURI= function() {
    return domainName.host + '/menuGroups';
}

exports.listSubMenusURI = function(menuUUID) {
    return domainName.host + '/menus' + menuUUID +  '/submenus';
}

exports.listAllSubMenusURI = function() {
    return domainName.host + '/listAllSubMenus';
}

