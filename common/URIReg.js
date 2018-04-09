var domain = require('./domain');

var config = require('../config/config');
var host = '';
if(config.is_https){
    host = 'https://'+ domain.getDomainName() +'/api/v1.0.0';
} else{
    host = 'http://'+ domain.getDomainName() +'/api/v1.0.0';
}
//var host = 'http.*/api/v1';
//var uuidType = '[a-z0-9A-Z]{22}';

exports.host = host;

exports.tenantURIReg =  new RegExp(host + '/tenants/.*');
exports.tenantsURIReg =  new RegExp(host + '/tenants');

