/**
 * Copyright(C),
 * FileName:  retrunResources.js
 * Author: yansha
 * Version: 1.0.0
 * Date: 2016/4/15  14:04
 * Description:
 */

"use strict";
const resourceURI = require('./resourceURI');
const URIParser = resourceURI.v1;
const common = require('commonutils').ctrl_common;
const querystring = require('querystring');
const _ = require('lodash');

//user
exports.generateUserRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.usersURI(info.organizationUUID ,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','accountHref','organizationUUID','departmentUUID']);
    retJson.account={'href':info.accountHref};
    retJson.organizaton={'href':URIParser.organizationsURI(info.organizationUUID)};
    retJson.department={'href':URIParser.departmentsByOrganizationURI(info.organizationUUID,info.departmentUUID)};
    retJson.role = {'href':URIParser.usersRoleURI(retJson.href)};

    return retJson;
};

exports.generateUserRoleRetJSON = (info) => {
    let retJson = {};
    retJson.href = URIParser.usersRoleMemshipURI(info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','roleHref','userUUID','organizationUUID']);
    retJson.user={'href':URIParser.usersURI(info.organizationUUID ,info.userUUID)};
    retJson.role={'href':info.roleHref};
    return retJson;
};

exports.generateListUsersRetJSON = (organizationUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.usersURI(organizationUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateUserRetJSON(item),this);
    return retJson;
};


exports.generateListUserRolesRetJSON = (infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.usersRoleMemshipURI() + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateUserRoleRetJSON(item),this);
    return retJson;
};

exports.generateListUsersByOrganizationRetJSON = (organizationUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.usersByOrganizationURI(organizationUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateUserRetJSON(item),this);
    return retJson;
};
exports.generateListUsersByDepartmentRetJSON = (organizationUUID,departmentUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.usersByDepartmentURI(organizationUUID,departmentUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateUserRetJSON(item),this);
    return retJson;
};

//tenant
exports.generateTenantRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.tenantsURI(info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','applicationURL']);
    retJson.application={'href':info.applicationURL};
    return retJson;
};
exports.generateListTenantsRetJSON = (infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.tenantsURI() + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateTenantRetJSON(item),this);
    return retJson;
};

//PackageDirectory
exports.generatePackageDirectoryRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.packageDirectorysURI(info.tenantUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','tenantUUID','merchantURL']);
    retJson.tenant={'href':URIParser.tenantsURI(info.tenantUUID)};
    retJson.merchant={'href':info.merchantURL};
    return retJson;
};
exports.generateListPackageDirectorysRetJSON = (tenantUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.packageDirectorysURI(tenantUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generatePackageDirectoryRetJSON(item),this);
    return retJson;
};

//carOwners
exports.generateCarOwnersRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.carOwnersURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','userMerchantHref']);

    retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.cars ={'href':URIParser.carsByOwnerURI(tenantUUID,info.directoryUUID,info.uuid)};

    retJson.userMerchant = {'href':info.userMerchantHref};

    return retJson;
};
exports.generateListCarOwnersRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carOwnersURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarOwnersRetJSON(tenantUUID,item),this);
    return retJson;
};

exports.generateListCarOwnerByTenantsRetJSON = (tenantUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carOwnersByTenantURI(tenantUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarOwnersRetJSON(tenantUUID,item),this);
    return retJson;
};

//cars
exports.generateCarsRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.carsURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','carOwnerHref','userMerchantHref']);

    retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.carOwner ={'href':info.carOwnerHref};

    retJson.terminals = {'href':URIParser.carDeviceMemshiURIByCars(tenantUUID,info.directoryUUID,info.uuid)};

    retJson.carGroupMemShips ={'href':URIParser.carGroupMemshipsURIByCars(tenantUUID,info.directoryUUID,info.uuid)};

    retJson.userMerchant = {'href':info.userMerchantHref};

    return retJson;
};
exports.generateListCarsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarsRetJSON(tenantUUID,item),this);
    return retJson;
};

exports.generateListPackageByTenantsRetJSON = (tenantUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.packagesByTenantURI(tenantUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generatePackagesRetJSON(tenantUUID,item),this);
    return retJson;
};



exports.generateListCarsByOwnerRetJSON = (tenantUUID,directoryUUID,ownerUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carsURIByOwner(tenantUUID,directoryUUID,ownerUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarsRetJSON(tenantUUID,item),this);
    return retJson;
};


exports.generateUnAllocGroupListCarsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.unAllocGroupCarsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarsRetJSON(tenantUUID,item),this);
    return retJson;
};


//carWorkOrders
exports.generateCarWorkOrdersRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.carWorkOrdersURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','carOwnerHref','carUUID','userMerchantHref','ownerMerchantHref']);

    retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.carOwner ={'href':info.carOwnerHref};

    retJson.car ={'href':URIParser.carsURI(tenantUUID,info.directoryUUID,info.carUUID)};

    retJson.userMerchant = {'href':info.userMerchantHref};

    retJson.ownerMerchant = {'href':info.ownerMerchantHref};

    return retJson;
};
exports.generateListCarWorkOrdersRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carWorkOrdersURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarWorkOrdersRetJSON(tenantUUID,item),this);
    return retJson;
};


exports.generateListWorkOrderByTenantsRetJSON = (tenantUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carWorkOrdersByTenantURI(tenantUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarWorkOrdersRetJSON(tenantUUID,item),this);
    return retJson;
};

//carDeviceMemships
exports.generateCarDeviceMemshipsRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.carDeviceMemshipsURI(info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','carUUID','terminalHref','tenantUUID']);

   // retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.car ={'href':URIParser.carsURI(info.tenantUUID,info.directoryUUID,info.carUUID)};

    retJson.terminal ={'href':info.terminalHref};

    return retJson;
};
exports.generateListCarDeviceMemshipsRetJSON = (infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carDeviceMemshipsURI() + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarDeviceMemshipsRetJSON(item),this);
    return retJson;
};

exports.generateListCarDeviceMemshipsByCarsRetJSON = (tenantUUID,directoryUUID,carUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carDeviceMemshiURIByCars(tenantUUID,directoryUUID,carUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarDeviceMemshipsRetJSON(item),this);
    return retJson;
};


//Packages
exports.generatePackagesRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.packagesURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','terminalHref','packageProductHref','batchUUID']);

    retJson.packageDirectory ={'href':URIParser.packageDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.terminal ={'href':info.terminalHref};
    retJson.packageProduct ={'href':info.packageProductHref};

    retJson.packageBatch ={'href':URIParser.packageBatchsURI(tenantUUID,info.directoryUUID,info.batchUUID)};


    return retJson;
};
exports.generateListPackagesRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.packagesURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generatePackagesRetJSON(tenantUUID,item),this);
    return retJson;
};


exports.generateListCarSubGroupsRetJSON = (tenantUUID,directoryUUID,groupUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carSubGroupsURI(tenantUUID,directoryUUID,groupUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarGroupsRetJSON(tenantUUID,item),this);
    return retJson;
};


exports.geneListSubGroupByDirectRetJson = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carSubGroupsByDirectURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarGroupsRetJSON(tenantUUID,item),this);
    return retJson;
};

//carGroupMemships
exports.generateCarGroupMemshipsRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.carGroupMemshipsURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','carUUID','groupUUID']);

    retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.car ={'href':URIParser.carsURI(tenantUUID,info.directoryUUID,info.carUUID)};

    retJson.carGroup ={'href':URIParser.carGroupsURI(tenantUUID,info.directoryUUID,info.groupUUID)};

    return retJson;
};
exports.generateListCarGroupMemshipsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carGroupMemshipsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarGroupMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};



exports.generateListCarGroupMemshipsByGroupRetJSON = (tenantUUID,directoryUUID,groupUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carGroupMemshipsURIByGroups(tenantUUID,directoryUUID,groupUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarGroupMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};

exports.generateListCarGroupMemshipsByCarRetJSON = (tenantUUID,directoryUUID,carUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carGroupMemshipsURIByCars(tenantUUID,directoryUUID,carUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarGroupMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};

//devices
exports.generateDeviceRetJSON = (tenantUUID,deviceDirectoryUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.devicesByTenantURI(tenantUUID,deviceDirectoryUUID ? deviceDirectoryUUID : info.directoryUUID
        ,info.batchUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','batchUUID','directoryUUID','simHref']);

    retJson.deviceBatch ={'href':URIParser.deviceBatchsURI(tenantUUID,deviceDirectoryUUID ? deviceDirectoryUUID : info.directoryUUID
        ,info.batchUUID)};
    retJson.deviceDirectory ={'href':URIParser.deviceDirectorysURI(tenantUUID,deviceDirectoryUUID ? deviceDirectoryUUID : info.directoryUUID)};

    retJson.deviceTrack ={'href':URIParser.deviceTracksByTenantURI(tenantUUID,deviceDirectoryUUID ? deviceDirectoryUUID : info.directoryUUID,
        info.batchUUID,info.uuid)};

    retJson.sim ={'href':info.simHref};

    return retJson;
};
exports.generateListDevicesRetJSON = (tenantUUID,deviceDirectoryUUID,deviceBatchUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.devicesByTenantURI(tenantUUID,deviceDirectoryUUID,deviceBatchUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateDeviceRetJSON(tenantUUID,deviceDirectoryUUID,item),this);
    return retJson;
};

exports.generateListDeviceByDirectsRetJSON = (tenantUUID,deviceDirectoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.devicesByDirectURI(tenantUUID,deviceDirectoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateDeviceRetJSON(tenantUUID,deviceDirectoryUUID,item),this);
    return retJson;
};


exports.generateListDeviceByTenantsRetJSON = (tenantUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.devicesByAllURI(tenantUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateDeviceRetJSON(tenantUUID,null,item),this);
    return retJson;
};


//deviceTracks
exports.generateDeviceTrackRetJSON = (tenantUUID,deviceDirectoryUUID,deviceBatchUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.deviceTracksByTenantURI(tenantUUID,deviceDirectoryUUID
    ,deviceBatchUUID,info.deviceUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','deviceUUID']);

    retJson.device ={'href':URIParser.devicesByTenantURI(tenantUUID,deviceDirectoryUUID,deviceBatchUUID,info.deviceUUID)};

    return retJson;
};
exports.generateListDeviceTracksRetJSON = (tenantUUID,deviceDirectoryUUID,deviceBatchUUID,deviceUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.deviceTracksByTenantURI(tenantUUID,deviceDirectoryUUID,deviceBatchUUID,deviceUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateDeviceTrackRetJSON(tenantUUID,deviceDirectoryUUID,deviceBatchUUID,item),this);
    return retJson;
};


//DeviceSimBinds
exports.generateDeviceSimBindsRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.deviceSimBindsURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','productHref']);

    retJson.deviceDirectory ={'href':URIParser.deviceDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.deviceSimDetails ={'href':URIParser.deviceSimBindDetailsURI(tenantUUID,info.directoryUUID,info.uuid)};

    retJson.product ={'href':info.productHref};

    return retJson;
};
exports.generateListDeviceSimBindsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.deviceSimBindsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateDeviceSimBindsRetJSON(tenantUUID,item),this);
    return retJson;
};



//DeviceBindDetails
exports.generateDeviceBindDetailsRetJSON = (tenantUUID,deviceDirectoryUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.deviceSimBindDetailsURI(tenantUUID,deviceDirectoryUUID
        ,info.bindUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','bindUUID','deviceHref','simHref']);

    retJson.deviceSimBind ={'href':URIParser.deviceSimBindsURI(tenantUUID,deviceDirectoryUUID,info.bindUUID)};
    retJson.deviceDirectory ={'href':URIParser.deviceDirectorysURI(tenantUUID,deviceDirectoryUUID)};

    retJson.device ={'href':info.deviceHref};
    retJson.sim ={'href':info.simHref};


    return retJson;
};
exports.generateListDeviceBindDetailsRetJSON = (tenantUUID,deviceDirectoryUUID,bindUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.deviceSimBindDetailsURI(tenantUUID,deviceDirectoryUUID,bindUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateDeviceBindDetailsRetJSON(tenantUUID,deviceDirectoryUUID,item),this);
    return retJson;
};




//products
exports.generateProductRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.productsURI(tenantUUID ,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','categoryUUID']);

    retJson.productDirectory={'href':URIParser.productDirectorysURI(tenantUUID,info.directoryUUID)};

    retJson.category={'href': info.categoryUUID ?
        URIParser.categorysByTenantURI(tenantUUID ,info.categoryUUID) : null};

    retJson.attributes={'href': URIParser.productAttrsURI(tenantUUID ,info.directoryUUID,info.uuid)};

    return retJson;
};
exports.generateListProductsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.productsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateProductRetJSON(tenantUUID,item),this);
    return retJson;
};


//productAttrs
exports.generateProductAttrRetJSON = (tenantUUID,productDirectoryUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.productAttrsURI(tenantUUID ,productDirectoryUUID,info.productUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','categoryUUID','attributeUUID','productUUID']);

    retJson.product={'href':URIParser.productsURI(tenantUUID ,productDirectoryUUID,info.productUUID)};

    retJson.attribute={'href': info.attributeUUID ?
        URIParser.categoryAttributeByTenantURI(tenantUUID,info.categoryUUID,info.attributeUUID): null};

    return retJson;
};
exports.generateListProductAttrsRetJSON = (tenantUUID,directoryUUID,productUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.productAttrsURI(tenantUUID,directoryUUID,productUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateProductAttrRetJSON(tenantUUID,directoryUUID,item),this);
    return retJson;
};


//batchdevices
exports.generateBatchDeviceRetJSON = (tenantUUID,packageDirectoryUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.devicesByDirectURI(tenantUUID,packageDirectoryUUID);
    retJson.data =info;

    return retJson;
};

//batchCreatePackages
exports.generateBatchPackagesRetJSON = (tenantUUID,packageDirectoryUUID,info,bCreated) => {
    let retJson = {};
    retJson.href=URIParser.batchPackagesByDirectURI(tenantUUID,packageDirectoryUUID,bCreated);
    retJson.size = info ? info.length : 0;
    retJson.items = null;
    if(info)
    {
        retJson.items  =info.map(item=>this.generatePackagesRetJSON(tenantUUID,item),this);
    }
    return retJson;
};

//PackagesByBatchNo
exports.generatePackagesByBatchNORetJSON = (tenantUUID,packageDirectoryUUID,packageBatchUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.packageByBatchsURI(tenantUUID,packageDirectoryUUID,packageBatchUUID);
    retJson.size = info ? info.length : 0;
    retJson.items = null;
    if(info)
    {
        retJson.items  =info.map(item=>this.generatePackagesRetJSON(tenantUUID,item),this);
    }
    return retJson;
};



//carControlGroups
exports.generateCarControlGroupsRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.carControlGroupsURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID']);

    retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};
    retJson.cars ={'href':URIParser.carsByCtrlGroupsURI(tenantUUID,info.directoryUUID,info.uuid)};
    retJson.groupUserMemships ={'href':URIParser.usersByCtrlGroupsURI(tenantUUID,info.directoryUUID,info.uuid)};
    retJson.groupMerchantMemships ={'href':URIParser.merchantsByCtrlGroupsURI(tenantUUID,info.directoryUUID,info.uuid)};

    return retJson;
};
exports.generateListCarCtrlGroupsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carControlGroupsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarControlGroupsRetJSON(tenantUUID,item),this);
    return retJson;
};


//ctrlGroupUserMemships
exports.generateCtrlGroupUserMemshipsRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.ctrlGroupUserMemshipsURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','controlGroupUUID','userHref']);

    retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};
    retJson.controlGroup ={'href':URIParser.carControlGroupsURI(tenantUUID,info.directoryUUID,info.controlGroupUUID)};
    retJson.user ={'href':info.userHref};

    return retJson;
};
exports.generateListCtrlGroupUserMemshipsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.ctrlGroupUserMemshipsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCtrlGroupUserMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};

exports.generateListCtrlGroupUserMemshipsByGroupRetJSON = (tenantUUID,directoryUUID,groupUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.usersByCtrlGroupsURI(tenantUUID,directoryUUID,groupUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCtrlGroupUserMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};

exports.generateListCtrlGroupUserMemshipsByTenantRetJSON = (tenantUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.ctrlGroupUserMemshipsTenantURI(tenantUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCtrlGroupUserMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};


//batchCtrlGroupUserMemships
exports.generateBatchCtrlGroupUserMemshipsRetJSON = (tenantUUID,carDirectoryUUID,info,bCreated) => {
    let retJson = {};
    retJson.href=URIParser.batchCtrlGroupUserMemshipsURI(tenantUUID,carDirectoryUUID,bCreated);
    retJson.size = info ? info.length : 0;
    retJson.items = null;
    if(info)
    {
        retJson.items  =info.map(item=>this.generateCtrlGroupUserMemshipsRetJSON(tenantUUID,item),this);
    }
    return retJson;
};


//ctrlGroupMerchantMemships
exports.generateCtrlGroupMerchantMemshipsRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.ctrlGroupMerchantMemshipsURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','controlGroupUUID','merchantHref']);

    retJson.carDirectory ={'href':URIParser.carDirectorysURI(tenantUUID,info.directoryUUID)};
    retJson.controlGroup ={'href':URIParser.carControlGroupsURI(tenantUUID,info.directoryUUID,info.controlGroupUUID)};
    retJson.merchant ={'href':info.merchantHref};

    return retJson;
};
exports.generateListCtrlGroupMerchantMemshipsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.ctrlGroupMerchantMemshipsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCtrlGroupMerchantMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};

exports.generateListCtrlGroupMerchantMemshipsByGroupRetJSON = (tenantUUID,directoryUUID,groupUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.merchantsByCtrlGroupsURI(tenantUUID,directoryUUID,groupUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCtrlGroupMerchantMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};


exports.generateListCtrlGroupMerchantMemshipsByTenantRetJSON = (tenantUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.ctrlGroupMerchantMemshipsTenantURI(tenantUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCtrlGroupMerchantMemshipsRetJSON(tenantUUID,item),this);
    return retJson;
};

//batchCtrlGroupMerchantMemships
exports.generateBatchCtrlGroupMerchantMemshipsRetJSON = (tenantUUID,carDirectoryUUID,info,bCreated) => {
    let retJson = {};
    retJson.href=URIParser.batchCtrlGroupMerchantMemshipsURI(tenantUUID,carDirectoryUUID,bCreated);
    retJson.size = info ? info.length : 0;
    retJson.items = null;
    if(info)
    {
        retJson.items  =info.map(item=>this.generateCtrlGroupMerchantMemshipsRetJSON(tenantUUID,item),this);
    }
    return retJson;
};


exports.generateListByCtrlGroupRetJSON = (tenantUUID,directoryUUID,groupUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.carsByCtrlGroupsURI(tenantUUID,directoryUUID,groupUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generateCarsRetJSON(tenantUUID,item),this);
    return retJson;
};


//PackageBatchNOs
exports.generatePackageBatchsRetJSON = (tenantUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.packageBatchsURI(tenantUUID,info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','directoryUUID','packageProductHref']);

    retJson.packageDirectory ={'href':URIParser.packageDirectorysURI(tenantUUID,info.directoryUUID)};
    retJson.packageProduct ={'href':info.packageProductHref};

    retJson.packages = {'href':URIParser.packageByBatchsURI(tenantUUID,info.directoryUUID,info.uuid)};

    return retJson;
};
exports.generateListPackageBatchsRetJSON = (tenantUUID,directoryUUID,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': URIParser.packageBatchsURI(tenantUUID,directoryUUID) + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    retJson.items = infos.map(item=>this.generatePackageBatchsRetJSON(tenantUUID,item),this);
    return retJson;
};


exports.buildCommonListsRetJSON = (requestHref,infos,offset,total,queryConditions={}) => {
    let expandStr = querystring.stringify(queryConditions);
    if (expandStr!='') { expandStr = '?' + expandStr;}
    let  retJson = {
        'href': requestHref + expandStr,
        'offset': offset,
        'limit': infos.length,
        'size' : total,
        'items': null
    };

    return retJson;
};


//memberCardType
exports.generatememberCardTypesRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.memberCardTypesURI(info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id']);
    return retJson;
};
exports.generateListmemberCardTypesRetJSON = (infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(URIParser.memberCardTypesURI(),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generatememberCardTypesRetJSON(item),this);
    return retJson;
};


//directorys
exports.generateDirectorysRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.directorysURI(info.uuid);
    retJson.merchant = {href:info.merchantHref};
    common.convert2ReturnData(retJson, info, ['uuid','id','merchantUUID','merchantHref']);
    return retJson;
};
exports.generateListDirectorysRetJSON = (infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(URIParser.directorysURI(),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateDirectorysRetJSON(item),this);
    return retJson;
};

//Members
exports.generateMembersRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.membersURI(info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','directoryUUID']);
    retJson.directory={href: URIParser.directorysURI(info.directoryUUID)};
    retJson.memberCards = {href:URIParser.memberCardsURI(info.directoryUUID,info.uuid)};

    return retJson;
};
exports.generateListMembersRetJSON = (directoryUUID,infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(URIParser.membersURI(directoryUUID),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateMembersRetJSON(item),this);
    return retJson;
};



//memberCards
exports.generatememberCardsRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.memberCardsURI(info.directoryUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','directoryUUID','cardTypeUUID','password','ownerHref','ownerUUID']);
    retJson.directory={href: URIParser.directorysURI(info.directoryUUID)};
    retJson.memberCardType = {href:URIParser.memberCardTypesURI(info.cardTypeUUID)};

    retJson.bankAccount = {href:URIParser.bankAccountsURI() + '?'+querystring.stringify({memberCardUUID:info.uuid})};
    retJson.memberCardService = {href:URIParser.memberCardServicesURI(info.directoryUUID,info.uuid)};

    retJson.owner = {href:info.ownerHref};

    return retJson;
};
exports.generateListmemberCardsRetJSON = (directoryUUID,memberUUID,infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.memberCardsURI(directoryUUID,memberUUID),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generatememberCardsRetJSON(item),this);
    return retJson;
};



//memberCardServices
exports.generatememberCardServicesRetJSON = (directoryUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.memberCardServicesURI(directoryUUID,info.memberCardUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','memberCardUUID','serviceUUID','serviceHref']);
    retJson.memberCard = {href:URIParser.memberCardsURI(directoryUUID,info.memberCardUUID)};
    retJson.service = {href:info.serviceHref};

    retJson.serviceRecord = {href:URIParser.serviceRecordsURI(directoryUUID,info.memberCardUUID,info.uuid)};
    return retJson;
};
exports.generateListmemberCardServicesRetJSON = (directoryUUID,memberCardUUID,infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.memberCardServicesURI(directoryUUID,memberCardUUID),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generatememberCardServicesRetJSON(directoryUUID,item),this);
    return retJson;
};



//ServiceRecords
exports.generateServiceRecordsRetJSON = (directoryUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.serviceRecordsURI(directoryUUID,info.memberCardUUID,info.serviceUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','memberCardUUID','serviceUUID']);
    retJson.memberCardService = {href:URIParser.memberCardServicesURI(directoryUUID,info.memberCardUUID,info.serviceUUID)};
    return retJson;
};
exports.generateListServiceRecordsRetJSON = (directoryUUID,memberCardUUID,serviceUUID,infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.serviceRecordsURI(directoryUUID,memberCardUUID,serviceUUID),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateServiceRecordsRetJSON(directoryUUID,item),this);
    return retJson;
};


//BankAccounts
exports.generateBankAccountsRetJSON = (info,isRetBalance = false) => {
    let retJson = {};
    retJson.href=URIParser.bankAccountsURI(info.uuid);

    let excludeKeys = ['uuid','id','memberCardHref','memberCardUUID','password'];

    if(!isRetBalance)
    {
        excludeKeys.push('balanceAmount');
    }
    common.convert2ReturnData(retJson, info, excludeKeys);

    retJson.memberCard = {href:info.memberCardHref};
    return retJson;
};
exports.generateListBankAccountsRetJSON = (infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.bankAccountsURI(),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateBankAccountsRetJSON(item),this);
    return retJson;
};



//TradeRecords
exports.generateTradeRecordsRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.tradeRecordsURI(info.bankAccountUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','bankAccountUUID']);
    retJson.bankAccount = {href:URIParser.bankAccountsURI(info.bankAccountUUID)};
    return retJson;
};
exports.generateListTradeRecordsRetJSON = (bankAccountUUID,infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.tradeRecordsURI(bankAccountUUID),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateTradeRecordsRetJSON(item),this);
    return retJson;
};


//PayRecords
exports.generatePayRecordsRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.payRecordsURI(info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','memberCardUUID','memberCardHref','orderUUID','orderHref']);
    retJson.memberCard = {href:info.memberCardHref};
    retJson.order = {href:info.orderHref};
    return retJson;
};
exports.generateListPayRecordsRetJSON = (infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.payRecordsURI(),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generatePayRecordsRetJSON(item),this);
    return retJson;
};


//DiscountRecords
exports.generateDiscountRecordsRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.discountRecordsURI(info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','memberCardUUID','memberCardHref','goodsHref','goodsUUID','orderHref']);
    retJson.memberCard = {href:info.memberCardHref};
    retJson.order = {href:info.orderHref};
    retJson.goods = {href:info.goodsHref};
    return retJson;
};
exports.generateListDiscountRecordsRetJSON = (infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.discountRecordsURI(),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateDiscountRecordsRetJSON(item),this);
    return retJson;
};



//TradeOrders
exports.generateTradeOrdersRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.tradeOrdersURI(info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','sellOrderHref','sellOrderUUID','merberCardHref','merberCardUUID']);
    retJson.sellOrder = {href:info.sellOrderHref};
    retJson.merberCard = {href:info.merberCardHref};
    return retJson;
};
exports.generateListTradeOrdersRetJSON = (infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.tradeOrdersURI(),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateTradeOrdersRetJSON(item),this);
    return retJson;
};



//tradeObjects
exports.generateTradeObjectsRetJSON = (info) => {
    let retJson = {};
    retJson.href=URIParser.tradeObjectsURI(info.tradeOrderUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','goodsHref','goodsUUID','tradeOrderUUID']);
    retJson.goods = {href:info.goodsHref};
    return retJson;
};
exports.generateListTradeObjectsRetJSON = (infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.tradeObjectsURI(),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateTradeObjectsRetJSON(item),this);
    return retJson;
};


//tradeDetails
exports.generateTradeDetailsRetJSON = (tradeOrderUUID,info) => {
    let retJson = {};
    retJson.href=URIParser.tradeDetailsURI(tradeOrderUUID,info.objectUUID,info.uuid);
    common.convert2ReturnData(retJson, info, ['uuid','id','objectUUID']);
    retJson.tradeObject = {href:URIParser.tradeObjectsURI(tradeOrderUUID,info.objectUUID)};
    return retJson;
};
exports.generateListTradeDetailsRetJSON = (tradeOrderUUID,objectUUID,infos,offset,total,queryConditions={}) => {
    let  retJson = this.buildCommonListsRetJSON(
        URIParser.tradeDetailsURI(tradeOrderUUID,objectUUID),infos,offset,total,queryConditions);
    retJson.items = infos.map(item=>this.generateTradeDetailsRetJSON(tradeOrderUUID,item),this);
    return retJson;
};