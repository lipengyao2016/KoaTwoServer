/**
 * Copyright(C),
 * FileName:  uri.js
 * Author: sxt
 * Version: 1.0.0
 * Date: 2015/10/13  15:29
 * Description:
 */

"use strict";
const domain = require('../common/domain');
const config = require('../config/config');

let host = '';
if (config.is_https){
    host = 'https://'+ domain.getDomainName() +'/api/v1.0.0';
}else{
    host = 'http://'+ domain.getDomainName() +'/api/v1.0.0';
}
const httpType= config.is_https?'https':'http';
const domainName = domain.getDomainName();

class ResourceURI{
    constructor(version='v1.0.0',host=domainName,schemes=httpType) {
        this.version = version;
        this.schemes = schemes;
        this.host = `${this.schemes}://${domainName}`;
        this.api = `${this.schemes}://${domainName}/api/${this.version}`;
        this.apiPath =  `/api/${this.version}`;
    };

    getHost()
    {
        return this.host;
    }

    //account
    accountsURI(applicationUUID,uuid){return (`${this.api}/applications/${applicationUUID}/accounts`) + (uuid?`/${uuid}`:"");};

    //application
    applicationsURI(uuid){ return (`${this.api}/applications`) + (uuid?`/${uuid}`:"");};
    //user
    usersURI(organizationUUID,uuid) {return (`${this.api}/userOrganizations/${organizationUUID}/users`)+ (uuid?`/${uuid}`:"");}
    usersByOrganizationURI(organizationUUID){
        return (`${this.api}/userOrganizations/${organizationUUID}/users`);
    }


    //department
    departmentsURI(applicationUUID,uuid) {return (`${this.api}/applications/${applicationUUID}/departments`)+ (uuid?`/${uuid}`:"");}





    tenantsURI(uuid,bUnit = false,bSysType = 0)
    {
        if(bUnit)
        {
            let prodServerPath = (bSysType == 0) ? config.serverHost.DeviceServerHost :'' ;
            return (`${prodServerPath}${this.apiPath}/tenants`) + (uuid?`/${uuid}`:"");
        }
        else
        {
            return (`${this.api}/tenants`) + (uuid?`/${uuid}`:"");
        }

    };

    DevicesByTenantHref(tenantHref,uuid) {
        return (`${tenantHref}/devices`)+ (uuid?`/${uuid}`:"");
    }

    attributesByCategoryURI(tenantUUID,categoryUUID){
        return (`${this.api}/tenants/${tenantUUID}/categories/${categoryUUID}/attributes`);
    }

    //categoryAttribute
    categoryAttributeByTenantURI(tenantUUID,categoryUUID,uuid) {
        return (`${this.api}/tenants/${tenantUUID}/categories/${categoryUUID}/attributes`)+ (uuid?`/${uuid}`:"");
    }

    categorysByTenantURI(tenantUUID,uuid) {
        return (`${this.api}/tenants/${tenantUUID}/categories`)+ (uuid?`/${uuid}`:"");
    }

    subCategorysURI(tenantUUID,categoryUUID){
        return (`${this.api}/tenants/${tenantUUID}/categories/${categoryUUID}/subCategories`);
    }


    //packageDirectory
    packageDirectorysURI(tenantUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/packageDirectorys`)+ (uuid?`/${uuid}`:"");}

    //carOwners
    carOwnersURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carOwners`)+ (uuid?`/${uuid}`:"");}

    //cars
    carsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/cars`)+ (uuid?`/${uuid}`:"");}


    //unAllocGroupCars
    unAllocGroupCarsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/unAllocGroupCars`)+ (uuid?`/${uuid}`:"");}


    //carByOwner
    carsURIByOwner(tenantUUID,directUUID,ownerUUID) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carOwners/${ownerUUID}/cars`);}

    //carWorkOrders
    carWorkOrdersURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carWorkOrders`)+ (uuid?`/${uuid}`:"");}

    //carWorkOrderByTenants
    carWorkOrdersByTenantURI(tenantUUID) {return (`${this.api}/tenants/${tenantUUID}/carWorkOrders`);}

    //packageByTenants
    packagesByTenantURI(tenantUUID) {return (`${this.api}/tenants/${tenantUUID}/packages`);}

    //carOwnerByTenants
    carOwnersByTenantURI(tenantUUID) {return (`${this.api}/tenants/${tenantUUID}/carOwners`);}

    //cars
    carsByOwnerURI(tenantUUID,carDirectoryUUID,OwnerUUID,uuid) {
        return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${carDirectoryUUID}/carOwners/${OwnerUUID}/cars`)+ (uuid?`/${uuid}`:"");
    }

    //carDeviceMemships
    carDeviceMemshipsURI(uuid) {return (`${this.api}/carTerminalMemships`)+ (uuid?`/${uuid}`:"");}


    //package
    packagesURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/packageDirectorys/${directUUID}/packages`)+ (uuid?`/${uuid}`:"");}

    //carSubGroups
    carSubGroupsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carGroups/${uuid}/subGroups`);}

    //carSubGroupsByDirect
    carSubGroupsByDirectURI(tenantUUID,directUUID) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/subGroups`);}

    //carGroupMemships
    carGroupMemshipsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carGroupMemships`)+ (uuid?`/${uuid}`:"");}

    //carDeviceMemshiByCars
    carDeviceMemshiURIByCars(tenantUUID,directUUID,carUUID) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/cars/${carUUID}/terminals`);}

    //carGroups
    carGroupMemshipsURIByGroups(tenantUUID,directUUID,groupUUID) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carGroups/${groupUUID}/cars`);}

    //cars
    carGroupMemshipsURIByCars(tenantUUID,directUUID,carUUID) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/cars/${carUUID}/carGroupMemShips`);}

    //devices
    devicesByDirectURI(tenantUUID,deviceDirectoryUUID,uuid) {
        return (`${this.api}/tenants/${tenantUUID}/deviceDirectorys/${deviceDirectoryUUID}/devices`)+ (uuid?`/${uuid}`:"");
    }

    //deviceTracks
    deviceTracksByTenantURI(tenantUUID,deviceDirectoryUUID,deviceBatchUUID,deviceUUid,uuid) {
        return (`${this.api}/tenants/${tenantUUID}/deviceDirectorys/${deviceDirectoryUUID}/deviceBatchs/${deviceBatchUUID}/devices/${deviceUUid}/deviceTracks`)+ (uuid?`/${uuid}`:"");
    }

    //deviceSimBind
    deviceSimBindsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/deviceDirectorys/${directUUID}/deviceSimBinds`)+ (uuid?`/${uuid}`:"");}

    //deviceSimBindDetails
    deviceSimBindDetailsURI(tenantUUID,directUUID,bindUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/deviceDirectorys/${directUUID}/deviceSimBinds/${bindUUID}/deviceSimBindDetails`)+ (uuid?`/${uuid}`:"");}


    //deviceTracks
    deviceTracksByDirectURI(tenantUUID,deviceDirectoryUUID,uuid) {
        return (`${this.api}/tenants/${tenantUUID}/deviceDirectorys/${deviceDirectoryUUID}/deviceTracks`)+ (uuid?`/${uuid}`:"");
    }

    //devices
    devicesByAllURI(tenantUUID,uuid) {
        return (`${this.api}/tenants/devices`)+ (uuid?`/${uuid}`:"");
    }

    //carControlGroups
    carControlGroupsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carControlGroups`)+ (uuid?`/${uuid}`:"");}

    //userForcarControlGroups
    usersByCtrlGroupsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carControlGroups/${uuid}/groupUserMemships`);}

    //merchantsForcarControlGroups
    merchantsByCtrlGroupsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carControlGroups/${uuid}/groupMerchantMemships`);}

    //carsForcarControlGroups
    carsByCtrlGroupsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/carControlGroups/${uuid}/cars`);}

    //ctrlGroupUserMemships
    ctrlGroupUserMemshipsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/ctrlGroupUserMemships`)+ (uuid?`/${uuid}`:"");}


    //ctrlGroupUserMemships
    ctrlGroupUserMemshipsTenantURI(tenantUUID) {return (`${this.api}/tenants/${tenantUUID}/ctrlGroupUserMemships`);}



    //ctrlGroupMerchantMemships
    ctrlGroupMerchantMemshipsURI(tenantUUID,directUUID,uuid) {return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}/ctrlGroupMerchantMemships`)+ (uuid?`/${uuid}`:"");}


    //ctrlGroupMerchantMemships
    ctrlGroupMerchantMemshipsTenantURI(tenantUUID) {return (`${this.api}/tenants/${tenantUUID}/ctrlGroupMerchantMemships`);}

    //batchCtrlGroupUserMemships
    batchCtrlGroupUserMemshipsURI(tenantUUID,directUUID,bCreated) {
        return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}`)+ (bCreated?`/batchCreateCtrlGroupUserMemships`:"/batchUpdateCtrlGroupUserMemships");
    }

    //batchCtrlGroupMerchantMemships
    batchCtrlGroupMerchantMemshipsURI(tenantUUID,directUUID,bCreated) {
        return (`${this.api}/tenants/${tenantUUID}/carDirectorys/${directUUID}`)+ (bCreated?`/batchCreateCtrlGroupMerchantMemships`:"/batchUpdateCtrlGroupMerchantMemships");
    }


    PackageByDirectoryURI(directHref,uuid) {
        return (`${directHref}/packages`)+ (uuid?`/${uuid}`:"");
    }

    PackageByTenantURI(tenantHref,uuid) {
        return (`${tenantHref}/packages`)+ (uuid?`/${uuid}`:"");
    }

    //batchPackagesByDirectURI
    batchPackagesByDirectURI(tenantUUID,packageDirectoryUUID) {
        return (`${this.api}/tenants/${tenantUUID}/packageDirectorys/${packageDirectoryUUID}/batchCreatePackages`);
    }

    batchPackageByDirectoryURI(directHref,uuid) {
        return (`${directHref}/batchCreatePackages`)+ (uuid?`/${uuid}`:"");
    }


    //packageBatchsURI
    packageBatchsURI(tenantUUID,directUUID,uuid) {
        return (`${this.api}/tenants/${tenantUUID}/packageDirectorys/${directUUID}/packageBatchs`)+ (uuid?`/${uuid}`:"");}

    //packageByBatchsURI
    packageByBatchsURI(tenantUUID,directUUID,batchUUID) {
        return (`${this.api}/tenants/${tenantUUID}/packageDirectorys/${directUUID}/packageBatchs/${batchUUID}/packages`);}

    PackageBatchByDirectoryURI(directHref) {
        return (`${directHref}/packageBatchs`);
    }

    //batchCreateOrdersURI
    batchCreateOrdersURI(directoryUUID) {
        let orderServerPath = config.serverHost.OrderServerHost;
        return (`${orderServerPath}${this.apiPath}/directories/${directoryUUID}/batchGenerateOrders`);
    }

    //listOrdersURI
    listOrdersURI(directoryUUID) {
        let orderServerPath = config.serverHost.OrderServerHost;
        return (`${orderServerPath}${this.apiPath}/directories/${directoryUUID}/orders`);
    }

    //bindDeviceSubServicesURI
    bindDeviceSubServicesURI()
    {
        let customerServerPath = config.serverHost.CustomerServiceMgrServerHost;
        return `${customerServerPath}${this.apiPath}/bindDeviceSubService` ;
    };

    //terminalsByAllURI
    terminalsByAllURI() {
        let prodServerPath = config.serverHost.DeviceBusiServerHost;
        return (`${prodServerPath}${this.apiPath}/terminals`);
    }

    //simsByAllURI
    simsByAllURI() {
        let prodServerPath = config.serverHost.DeviceBusiServerHost;
        return (`${prodServerPath}${this.apiPath}/sims`);
    }

    //makeDeviceSubServicesURI
    makeDeviceSubServicesURI()
    {
        let customerServerPath = config.serverHost.CustomerServiceMgrServerHost;
        return `${customerServerPath}${this.apiPath}/makeSubService` ;
    };


    //memberCardTypesURI
    memberCardTypesURI(uuid)
    {return (`${this.api}/memberCardTypes`)+ (uuid?`/${uuid}`:"");}


    //directorysURI
    directorysURI(uuid)
    {return (`${this.api}/directorys`)+ (uuid?`/${uuid}`:"");}


    //membersURI
    membersURI(directoryUUID,uuid)
    {
        if(directoryUUID)
        {
            return (`${this.api}/directorys/${directoryUUID}/members`)+ (uuid?`/${uuid}`:"");
        }
        else
        {
            return (`${this.api}/members`)+ (uuid?`/${uuid}`:"");
        }

    }


    //memberCardsURI
    memberCardsURI(directoryUUID,uuid)
    {
        if(directoryUUID)
        {
            return (`${this.api}/directorys/${directoryUUID}/memberCards`)+ (uuid?`/${uuid}`:"");
        }
        else
        {
            return (`${this.api}/memberCards`)+ (uuid?`/${uuid}`:"");
        }
    }

    //memberCardServicesURI
    memberCardServicesURI(directoryUUID,memberCardUUID,uuid)
    {
        return (`${this.api}/directorys/${directoryUUID}/memberCards/${memberCardUUID}/memberCardServices`)
            + (uuid?`/${uuid}`:"");
    }


    //serviceRecordsURI
    serviceRecordsURI(directoryUUID,memberCardUUID,serviceUUID,uuid)
    {
        return (`${this.api}/directorys/${directoryUUID}/memberCards/${memberCardUUID}/memberCardServices/${serviceUUID}/serviceRecords`)
            + (uuid?`/${uuid}`:"");
    }


    //bankAccountsURI
    bankAccountsURI(uuid)
    {return (`${this.api}/bankAccounts`)+ (uuid?`/${uuid}`:"");}


    //tradeRecordsURI
    tradeRecordsURI(bankAccountUUID,uuid)
    {return (`${this.api}/bankAccounts/${bankAccountUUID}/tradeRecords`)+ (uuid?`/${uuid}`:"");}


    //payRecordsURI
    payRecordsURI(uuid)
    {return (`${this.api}/payRecords`)+ (uuid?`/${uuid}`:"");}

    //discountRecordsURI
    discountRecordsURI(uuid)
    {return (`${this.api}/discountRecords`)+ (uuid?`/${uuid}`:"");}


    //tradeOrdersURI
    tradeOrdersURI(uuid)
    {return (`${this.api}/tradeOrders`)+ (uuid?`/${uuid}`:"");}



    tradeObjectsURI(tradeOrderUUID,uuid)
    {return (`${this.api}/tradeOrders/${tradeOrderUUID}/tradeObjects`)+ (uuid?`/${uuid}`:"");}


    tradeDetailsURI(tradeOrderUUID,tradeObjectUUID,uuid)
    {return (`${this.api}/tradeOrders/${tradeOrderUUID}/tradeObjects/${tradeObjectUUID}/tradeDetails`)+ (uuid?`/${uuid}`:"");}

}

exports.v1 = new ResourceURI('v1.0.0');
exports.ResourceURI = ResourceURI;