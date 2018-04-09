
#Remark
1.目前所有的测试环境请求IP都是192.168.7.210,由于本API文档是在本机测试，所以全为localhost,
真正使用时，请把localhost替换为192.168.7.210或者生产环境上真实的IP.

资源列表：
packageBatch(套餐批次)
package(套餐)

#packageBatch:

packageBatch套餐批次，是每次导入套餐的批次汇总信息。



###1.列表所有设备的套餐批次信息

获取某个商户下所有的套餐批次列表,若不传商户链接，则是查找所有的套餐批次列表。

http://localhost:5054/api/v1.0.0/packageBatchs

**http**

 get
 
**request**

```
  {
    merchantHref:'http://192.168.7.202:5006/api/v1.0.0/merchants/AsClSBzKMRYdh0OdSgIPmg',  //要获取的资源所属的商户链接。
  };

```

**response**

```
{
	"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packageBatchs?merchantHref=http%3A%2F%2F192.168.7.210%3A5006%2Fapi%2Fv1.0.0%2Fmerchants%2FaR5Uj5qbZw7yjiP0zDqmyQ&offset=0&limit=25",
	"offset": 0,
	"limit": 6,
	"size": 6,
	"items": [{
		"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packageBatchs/SqJBNLrhwHD2bMsi88mr3A",
		"batchNo": "000000",
		"quatity": 2,
		"operator": "system",
		"packageName": "LIU基础套餐",
		"deviceType": "sim",
		"remark": "lpy import liuliang taocan.",
		"createdAt": "2017-08-24 16:59:59",
		"modifiedAt": "2017-08-24 16:59:59",
		"packageDirectory": {
			"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg"
		},
		"packageProduct": {
			"href": "http://192.168.7.150:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/2gewMYnuKSLJvMdamrt9fg/compositeProducts/jhEigLJu0sJFH29AV6fIOQ"
		},
		"packages": {
			"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packageBatchs/SqJBNLrhwHD2bMsi88mr3A/packages"
		}
	},
]
}

```

#package:

package资源是指设备绑定的服务套餐功能，目前主要从EXCEL导入，常用来绑定后视镜，或者追踪器的基础服务套餐。



###1.列表所有设备的套餐绑定记录

获取某个商户下所有的设备套餐绑定列表,若不传商户链接，则是查找所有的绑定记录列表。

http://localhost:5054/api/v1.0.0/packages

**http**

 get
 
**request**

```
  {
    merchantHref:'http://192.168.7.202:5006/api/v1.0.0/merchants/AsClSBzKMRYdh0OdSgIPmg',  //要获取的资源所属的商户链接。
  };

```

**response**

```
{

    "href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packageBatchs/SqJBNLrhwHD2bMsi88mr3A/packages",
    "size": 2,
    "items": [
        {
            "href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packages/KZuGrTGXpWKzUA8HFFhSbA",
            "sn": "99860042191696005645",
            "packagetName": "LIU基础套餐",
            "deviceType": "sim",
            "status": "enabled",
            "creater": "system",
            "createdAt": "2017-08-24 16:59:59",
            "modifiedAt": "2017-08-24 16:59:59",
            "packageDirectory": {
                "href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg"
            },
            "terminal": {
                "href": "http://192.168.7.150:5023/api/v1.0.0/tenants/28sWrZ5Hy6fo5CEV7Smv2A/simDirectorys/8PUomQwjRo0fKc74RmpvhQ/sims/tmcJakxYp27J8Zt7gsej1A"
            },
            "packageProduct": {
                "href": "http://192.168.7.150:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/2gewMYnuKSLJvMdamrt9fg/compositeProducts/jhEigLJu0sJFH29AV6fIOQ"
            },
            "packageBatch": {
                "href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packageBatchs/SqJBNLrhwHD2bMsi88mr3A"
            }
        },
    ]

}

```

###2.批量绑定套餐

为多个设备批量绑定套餐。

http://localhost:5054/api/v1.0.0/bindPackage

**http**

 post
 
**request**

```
  {
   
      
         //套餐产品链接。
         packageProductHref:'http://192.168.7.202:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/WhHLMwHCPz0XWdmCoPolSA/compositeProducts/oHOT76ZqVISBG1eq0jT21w',
         //套餐产品名称。
         packagetName:'追踪器基础套餐',
         
         remark:'lpy import liuliang taocan.',  //备注。
         
         deviceType:'sim',  //设备类型，有device,sim两种,当是device时后面的ID列表要传sn,当是sim时后面的ID列表要传iccid, 
                   
         //所要绑定的设备列表。
         devices: [
             {
                 sn: "1311713000162016",
             },
             {
                 sn: "1311713000172115",
             },
         ],
     };
  
```

**response**

```
{
	"errorCode": 0,      //0为成功，其它为失败。
	"errorMessage": "success",
	"data": {
		"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/cSzyciwPVvXJAT11kW49Jg/batchCreatePackages",
		"size": 2,
		"items": [{
			"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packageBatchs/SqJBNLrhwHD2bMsi88mr3A",
            		"batchNo": "000000",
            		"quatity": 2,
            		"operator": "system",
            		"packageName": "LIU基础套餐",
            		"deviceType": "sim",
            		"remark": "lpy import liuliang taocan.",
            		"createdAt": "2017-08-24 16:59:59",
            		"modifiedAt": "2017-08-24 16:59:59",
            		"packageDirectory": {
            			"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg"
            		},
            		"packageProduct": {
            			"href": "http://192.168.7.150:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/2gewMYnuKSLJvMdamrt9fg/compositeProducts/jhEigLJu0sJFH29AV6fIOQ"
            		},
            		"packages": {
            			"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/caMCVLERKXaV0vbPe8LEhg/packageBatchs/SqJBNLrhwHD2bMsi88mr3A/packages"
            		}
		},
		]
	}

```

###3.通过EXCEL导入绑定套餐

通过EXCEL为多个设备批量绑定套餐。

http://localhost:5054/api/v1.0.0/importPackage

**http**

 post
 
**request**

```
  {
         //套餐产品链接。
         packageProductHref:'http://192.168.7.202:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/WhHLMwHCPz0XWdmCoPolSA/compositeProducts/oHOT76ZqVISBG1eq0jT21w',
         //套餐产品名称。
         packagetName:'追踪器基础套餐',
         remark:'lpy import liuliang taocan.',  //备注。    
         deviceType:'sim',  //设备类型，有device,sim两种,当是device时后面的ID列表要传sn,当是sim时后面的ID列表要传iccid, 
         fileData:'gsdsa', //EXCEL文件数据，包括主要包括的SN列表。
     };
  
```

**response**

```
{
	"errorCode": 0,
	"errorMessage": "success",
	"data": {
		"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/cSzyciwPVvXJAT11kW49Jg/batchCreatePackages",
		"size": 2,
		"items": [{
			"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/cSzyciwPVvXJAT11kW49Jg/packages/yVKFrjGbPlRbMZqAznCHlQ",
			"sn": "1311713000162016",
			"packagetName": "追踪器基础套餐",
			"status": "enabled",
			"creater": "system",
			"modifiedAt": "2017-04-05 14:04:17",
			"createdAt": "2017-04-05 14:04:17",
			"packageDirectory": {
				"href": "http://localhost:5054/api/v1.0.0/tenants/94JveWHViaT3frKuutKh7w/packageDirectorys/cSzyciwPVvXJAT11kW49Jg"
			},
			"terminal": {
				"href": "http://192.168.7.202:5024/api/v1.0.0/tenants/0VnRpHOEcPpN1CICQ5yTOw/deviceDirectorys/ZCkl5xbHi8JRqjxLKI4sXA/devices/Ogo7NhMsZprbUVHTducWYw"
			},
			"packageProduct": {
				"href": "http://192.168.7.202:5021/api/v1.0.0/tenants/nDy8dOynNil4KAdXrhJBog/productDirectorys/WhHLMwHCPz0XWdmCoPolSA/compositeProducts/oHOT76ZqVISBG1eq0jT21w"
			}
		},
		]
	}

```


###4.获取套餐导入的EXCEL模板

获取套餐导入的EXCEL模板。

http://localhost:5054/api/v1.0.0/ImportExcelTemplate

**http**

 get
 
**request**

```
  {
    excelType:'devicePackageBindImport',
  };

```

**response**

返回模板的EXCEL文件。




